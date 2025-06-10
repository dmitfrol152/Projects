import express from "express";
import nunjucks from "nunjucks";
import http from "http";
import { nanoid } from "nanoid";
import crypto from "crypto";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import GitHubStrategy from "passport-github";
import passport from "passport";
import session from "express-session";
import knex from "knex";

dotenv.config();
const app = express();
const server = http.createServer(app);

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const db = knex({
  client: "pg",
  connection: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  pool: {
    min: 0,
    max: 7,
    createTimeoutMillis: 30000,
    acquireTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 100,
  }
});

db.raw('SELECT 1')
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

const getHash = (password) => {
  const hash = crypto.createHash("sha256");
  hash.update(password.trim());
  const hashText = hash.digest("hex");
  return hashText;
};
const findUserByUsername = async (username) => db("users").select().where({ username }).first();
const findUserById = async (id) => db("users").select().where({ id }).first();
const createNewUser = async (newUser) => {
  const [insertedUserRow] = await db("users")
    .insert({
      username: newUser.username,
      password: newUser.password,
    })
    .returning("id");
  return insertedUserRow.id;
};
const createNewNote = async (userId, title, text) => {
  const [note] = await db("notes")
    .insert({
      user_id: userId,
      title,
      text,
      created_at: new Date(),
      is_archived: false,
    })
    .returning("*");
  return note;
};
const updatedNote = async (id, title, text) => {
  const [updateNote] = await db("notes")
    .where({ id: id })
    .update({
      title,
      text,
    })
    .returning("*");
  return updateNote;
};
const deleteNote = async (id) => {
  const [deleteNote] = await db("notes").where({ id: id }).del().returning("*");
  return deleteNote;
};
const deleteAllNote = async (userId) => {
  const deleteNotes = await db("notes").where("user_id", userId).where("is_archived", true).del().returning("*");
  return deleteNotes;
};

const createDemoNote = async (userId) => {
  const demoTitle = "Demo";
  const demoText = `# Добро пожаловать!`;

  return await createNewNote(userId, demoTitle, demoText);
};

app.set("view engine", "njk");

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' },
  }),
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${BASE_URL}/auth/github/callback`,
      scope: ["read:user"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        let user = await findUserByUsername(profile.username);
        if (!user) {
          const randomPassword = nanoid();
          const hashedPassword = getHash(randomPassword);

          user = {
            username: profile.username,
            password: hashedPassword,
            notes: 0,
          };
          const userId = await createNewUser(user);
          const demoNote = await createDemoNote(userId);
          user.id = userId;
          user.demoNoteId = demoNote.id;
        }
        return cb(null, user);
      } catch (error) {
        console.error("Ошибка при аутентификации через GitHub:", error);
        return cb(error);
      }
    },
  ),
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await findUserById(id);
  if (user) {
    done(null, user);
  } else {
    done(new Error("Пользователь не найден"), null);
  }
});

app.get("/", (req, res) => {
  res.render("index", {
    authError: req.query.authError === "true" ? "Wrong username or password" : req.query.authError,
  });
});

app.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const user = await findUserByUsername(username);
  if (!user) {
    return res.redirect("/?authError=true");
  }
  const hashText = getHash(password);
  if (hashText !== user.password) {
    return res.redirect("/?authError=true");
  }
  req.login(user, (err) => {
    if (err) {
      return next(err);
    }
    return res.redirect("/dashboard");
  });
});

app.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;
  const user = await findUserByUsername(username);
  if (user || !password || !username) {
    return res.redirect("/?authError=true");
  }
  const hashText = getHash(password);

  const newUser = {
    username: username,
    password: hashText,
  };
  const userId = await createNewUser(newUser);
  const demoNote = await createDemoNote(userId);
  const createdUser = await findUserById(userId);

  req.login(createdUser, (err) => {
    if (err) {
      return next(err);
    }
    return res.redirect(`/dashboard#/note/${demoNote.id}`);
  });
});

app.get("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy((err) => {
      if (err) {
        console.log("Ошибка при уничтожении сессии:", err);
      }
      res.clearCookie("connect.sid");
      res.redirect("/");
    });
  });
});

app.get("/dashboard", async (req, res) => {
  if (!req.user) {
    return res.redirect("/");
  }
  res.render("dashboard", { user: req.user });
});

app.get("/api/notes", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Необходимо авторизоваться" });
  }

  const { age, search, page = 1 } = req.query;
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    let query = db("notes").where("user_id", req.user.id);

    if (age) {
      if (age === "archive") {
        query = query.where("is_archived", true);
      } else if (age !== "alltime") {
        const date = new Date();
        const months = parseInt(age);
        if (!isNaN(months)) {
          date.setMonth(date.getMonth() - months);
          query = query.where("created_at", ">=", date);
        }
      }
    }

    if (search) {
      query = query.where("title", "ilike", `%${search}%`).orWhere("text", "ilike", `%${search}%`);
    }

    const total = await query.clone().count().first();

    const notes = await query.orderBy("created_at", "desc").limit(limit).offset(offset);

    res.json({
      data: notes.map((note) => ({
        ...note,
        _id: note.id,
        created: note.created_at,
        isArchived: note.is_archived,
      })),
      hasMore: offset + limit < parseInt(total.count),
      pagination: {
        total: parseInt(total.count),
        page: parseInt(page),
        limit,
      },
    });
  } catch (error) {
    console.error("Ошибка при получении заметок:", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
});

app.post("/api/notes", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Необходимо авторизоваться" });
  }

  const { title, text } = req.body;

  if (!title || !text) {
    return res.status(400).json({ error: "Поле Заголовок или поле Описание не могут быть пустыми!" });
  }

  try {
    const newNote = await createNewNote(req.user.id, title, text);
    res.json({
      ...newNote,
      _id: newNote.id,
      created: newNote.created_at,
      isArchived: newNote.is_archived,
    });
  } catch (error) {
    console.error("Ошибка создания заметки!", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
});

app.get("/api/notes/:id", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Необходимо авторизоваться" });
  }

  const { id } = req.params;

  try {
    const note = await db("notes").where({ id: id, user_id: req.user.id }).first();

    if (!note) {
      return res.status(404).json({ error: "Заметка не найдена" });
    }

    const response = {
      ...note,
      _id: note.id,
      created: note.created_at,
      isArchived: note.is_archived,
    };
    res.json(response);
  } catch (err) {
    console.error("Ошибка при открытии заметки!", err);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
});

app.post("/api/notes/:id/archive", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Необходимо авторизоваться" });
  }

  const { id } = req.params;

  try {
    const note = await db("notes").where({ id: id, user_id: req.user.id }).first();

    if (!note) {
      return res.status(404).json({ error: "Заметка не найдена" });
    }

    const [updatedNote] = await db("notes")
      .where({ id: id, user_id: req.user.id })
      .update({
        is_archived: true,
      })
      .returning("*");

    res.json({
      ...updatedNote,
      _id: updatedNote.id,
      created: updatedNote.created_at,
      isArchived: updatedNote.is_archived,
    });
  } catch (err) {
    console.error("Ошибка при архивации заметки!", err);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
});

app.post("/api/notes/:id/unarchive", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Необходимо авторизоваться" });
  }

  const { id } = req.params;

  try {
    const note = await db("notes").where({ id: id, user_id: req.user.id }).first();

    if (!note) {
      return res.status(404).json({ error: "Заметка не найдена" });
    }

    const [updatedNote] = await db("notes")
      .where({ id: id, user_id: req.user.id })
      .update({
        is_archived: false,
      })
      .returning("*");

    res.json({
      ...updatedNote,
      _id: updatedNote.id,
      created: updatedNote.created_at,
      isArchived: updatedNote.is_archived,
    });
  } catch (err) {
    console.error("Ошибка при архивации заметки!", err);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
});

app.patch("/api/notes/:id/update", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Необходимо авторизоваться" });
  }

  const { id, title, text } = req.body;

  if (!title || !text) {
    return res.status(400).json({ error: "Поле Заголовок или поле Описание не могут быть пустыми!" });
  }

  try {
    const updateNote = await updatedNote(id, title, text);
    res.json({
      ...updateNote,
      _id: id,
      updated_at: new Date(),
      title,
      text,
    });
  } catch (error) {
    console.error("Ошибка создания заметки!", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
});

app.delete("/api/notes/:id", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Необходимо авторизоваться" });
  }

  const { id } = req.params;

  const updateNote = await deleteNote(id);
  res.json({
    ...updateNote,
  });
});

app.delete("/api/notes", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Необходимо авторизоваться" });
  }

  try {
    const deleteNotes = await deleteAllNote(req.user.id);
    res.json({
      deleteNotes,
    });
  } catch (error) {
    console.error("Ошибка при удалении архивных заметок:", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
});

app.get("/auth/github", passport.authenticate("github"));

app.get("/auth/github/callback", passport.authenticate("github", { failureRedirect: "/" }), function (req, res) {
  if (req.user.demoNoteId) {
    res.redirect(`/dashboard#/note/${req.user.demoNoteId}`);
  } else {
    res.redirect("/dashboard");
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`   Listening on ${BASE_URL}`);
});
