require("dotenv").config();

const express = require("express");
const nunjucks = require("nunjucks");
const { nanoid } = require("nanoid");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const http = require("http");
const { WebSocketServer } = require("ws");
const { MongoClient, ObjectId } = require("mongodb");
const cookie = require("cookie");

const clientPromise = new MongoClient(process.env.DB_URL);

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  tags: {
    blockStart: "[%",
    blockEnd: "%]",
    variableStart: "[[",
    variableEnd: "]]",
    commentStart: "[#",
    commentEnd: "#]",
  },
});

app.set("view engine", "njk");

app.use(express.json());
app.use(express.static("public"));

app.use(async (req, res, next) => {
  try {
    const client = await clientPromise;
    req.db = client.db("users");
    next();
  } catch (err) {
    next(err);
  }
});

const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });

const clients = new Map();

const gatHash = (pas) => {
  const hash = crypto.createHash("sha256");
  hash.update(pas.trim());
  const hashText = hash.digest("hex");
  return hashText;
};

const getActiveTimers = (db, userId) =>
  db
    .collection("users")
    .findOne(
      { _id: new ObjectId(userId) },
      {
        projection: {
          timers: 1,
        },
      }
    )
    .then((user) => (user?.timers || []).filter((timer) => timer.isActive));

const getOldTimers = (db, userId) =>
  db
    .collection("users")
    .findOne(
      { _id: new Object(userId) },
      {
        projection: {
          timers: 1,
        },
      }
    )
    .then((user) => (user?.timers || []).filter((timer) => !timer.isActive));

const createNewTime = async (db, newTimer, userId) => {
  const timerId = nanoid();
  await db.collection("users").updateOne(
    { _id: new ObjectId(userId) },
    {
      $push: {
        timers: {
          start: newTimer.start,
          timerId,
          description: newTimer.description,
          isActive: true,
        },
      },
    }
  );

  return { timerId };
};
const findUserByUsername = async (db, username) => db.collection("users").findOne({ username });
const findUserBySessionId = async (db, sessionId) => {
  try {
    const session = await db.collection("sessions").findOne(
      { sessionId },
      {
        projection: { userId: 1 },
      }
    );
    if (!session || !session.userId) {
      return;
    }
    const user = await db.collection("users").findOne({ _id: session.userId });
    return user;
  } catch (error) {
    console.error(error);
    return;
  }
};
const createNewUser = async (db, newUser) => {
  const insertedUserRow = await db.collection("users").insertOne({
    username: newUser.username,
    password: newUser.password,
    timers: [],
  });
  return insertedUserRow.insertedId;
};
const createSessionId = async (db, userId) => {
  const sessionId = nanoid();
  await db.collection("sessions").insertOne({
    userId: new ObjectId(userId),
    sessionId,
  });
  return sessionId;
};
const deleteSession = async (db, sessionId) => {
  await db.collection("sessions").deleteOne({ sessionId });
};

app.use(cookieParser());

const auth = async (req, res, next) => {
  if (!req.cookies["sessionId"]) {
    return next();
  }
  const user = await findUserBySessionId(req.db, req.cookies["sessionId"]);
  req.user = user;
  req.sessionId = req.cookies["sessionId"];
  next();
};

app.get("/", auth, async (req, res) => {
  res.render("index", {
    user: req.user,
    userToken: req.cookies.sessionId,
    authError: req.query.authError === "true" ? "Wrong username or password" : req.query.authError,
  });
});

app.post("/login", bodyParser.urlencoded({ extended: false }), async (req, res) => {
  const { username, password } = req.body;
  const user = await findUserByUsername(req.db, username);

  if (!user) {
    return res.redirect("/?authError=true");
  }
  const hashText = gatHash(password);
  if (hashText !== user.password) {
    return res.redirect("/?authError=true");
  }
  const sessionId = await createSessionId(req.db, user._id);
  res.cookie("sessionId", sessionId, { httpOnly: true }).redirect("/");
});

app.post("/signup", bodyParser.urlencoded({ extended: false }), async (req, res) => {
  const { username, password } = req.body;

  const findedUser = await findUserByUsername(req.db, username);

  if (!username || !password || findedUser) {
    return res.redirect("/?authError=true");
  }

  const hashText = gatHash(password);

  const newUser = {
    username: username,
    password: hashText,
  };
  const createdUser = await createNewUser(req.db, newUser);

  const sessionId = await createSessionId(req.db, createdUser);
  res.cookie("sessionId", sessionId, { httpOnly: true }).redirect("/");
});

app.get("/logout", auth, async (req, res) => {
  if (!req.user) {
    return res.redirect("/");
  }
  await deleteSession(req.db, req.sessionId);
  res.clearCookie("sessionId").redirect("/");
});

app.get("/api/timers", async (req, res) => {
  const user = await findUserBySessionId(req.db, req.cookies.sessionId);

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.query.isActive === "true") {
    const activeTimers = await getActiveTimers(req.db, user._id);

    const formattedTimers = activeTimers.map((timer) => {
      return {
        id: timer.timerId,
        start: Number(timer.start),
        description: timer.description,
        isActive: true,
        progress: Number(Date.now() - timer.start),
      };
    });

    res.json(formattedTimers);
  } else {
    const oldTimers = await getOldTimers(req.db, user._id);
    const formattedTimers = oldTimers.map((timer) => ({
      ...timer,
      start: Number(timer.start),
      end: Number(timer.end),
      duration: Number(timer.duration),
    }));
    res.json(formattedTimers);
  }
});

const sendUpdatedTimers = async (userId) => {
  try {
    const client = await clientPromise;
    const db = client.db("users");
    const activeTimers = await getActiveTimers(db, userId);

    const formattedActiveTimers = activeTimers.map((timer) => ({
      id: timer.timerId,
      start: Number(timer.start),
      description: timer.description,
      isActive: true,
      progress: Number(Date.now() - timer.start),
    }));

    const fullMessage = JSON.stringify({
      type: "active_timers",
      message: formattedActiveTimers,
    });

    for (const client of clients.values()) {
      client.send(fullMessage);
    }
  } catch (err) {
    console.error("Ошибка при отправке активных таймеров:", err);
  }
};

const sendOldTimers = async (userId) => {
  try {
    const client = await clientPromise;
    const db = client.db("users");
    const oldTimers = await getOldTimers(db, userId);

    const formattedOldTimers = oldTimers.map((timer) => ({
      id: timer.timerId,
      start: Number(timer.start),
      description: timer.description,
      isActive: false,
      end: Number(timer.end),
      duration: Number(timer.duration),
    }));

    const fullMessage = JSON.stringify({
      type: "old_timers",
      message: formattedOldTimers,
    });

    for (const client of clients.values()) {
      client.send(fullMessage);
    }
  } catch (err) {
    console.error("Ошибка при отправке таймеров:", err);
  }
};

const sendActiveTimers = async (userId) => {
  const client = await clientPromise;
  const db = client.db("users");
  const activeTimers = await getActiveTimers(db, userId);

  if (activeTimers.length > 0) {
    const intervalId = setInterval(async () => {
      try {
        const activeTimers = await getActiveTimers(db, userId);
        if (activeTimers.length === 0) {
          clearInterval(intervalId);
          return;
        }

        const formattedActiveTimers = activeTimers.map((timer) => ({
          id: timer.timerId,
          start: Number(timer.start),
          description: timer.description,
          isActive: true,
          progress: Number(Date.now() - timer.start),
        }));

        const fullMessage = JSON.stringify({
          type: "active_timers",
          message: formattedActiveTimers,
        });

        for (const client of clients.values()) {
          client.send(fullMessage);
        }
      } catch (err) {
        console.error("Ошибка при отправке активных таймеров:", err);
      }
    }, 1000);
  }
};

app.post("/api/timers", async (req, res) => {
  const { description } = req.body;
  const user = await findUserBySessionId(req.db, req.cookies.sessionId);

  if (!user) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  const timer = {
    start: Date.now(),
    description,
    isActive: true,
    progress: 0,
  };

  const { timerId } = await createNewTime(req.db, timer, user._id);

  const newTimer = {
    id: timerId,
    start: timer.start,
    description: timer.description,
    isActive: true,
    progress: 0,
  };

  await sendOldTimers(user._id);
  await sendUpdatedTimers(user._id);
  await sendActiveTimers(user._id);
  res.json(newTimer);
});

app.post("/api/timers/:id/stop", async (req, res) => {
  const { id } = req.params;
  const user = await findUserBySessionId(req.db, req.cookies.sessionId);

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const timerToStop = await req.db
    .collection("users")
    .findOne(
      { _id: new ObjectId(user._id) },
      {
        projection: {
          timers: 1,
        },
      }
    )
    .then((user) => user.timers.filter((timer) => timer.timerId === id));

  if (!timerToStop) {
    return res.status(404).send({ error: "Timer not found" });
  }

  const duration = Date.now() - timerToStop[0].start;

  const updatedTimer = await req.db.collection("users").findOneAndUpdate(
    {
      _id: new ObjectId(user._id),
      "timers.timerId": id,
    },
    {
      $set: {
        "timers.$.end": Date.now(),
        "timers.$.duration": duration,
        "timers.$.isActive": false,
      },
    },
    { returnDocument: "after" }
  );

  const modifiedTimer = updatedTimer.timers.find((timer) => timer.timerId === id);
  await sendUpdatedTimers(user._id);
  await sendOldTimers(user._id);
  res.json(modifiedTimer);
});

wss.on("connection", async (ws, req) => {
  const userId = req.userId;
  clients.set(userId, ws);

  try {
    await sendOldTimers(userId);
    await sendUpdatedTimers(userId);
    await sendActiveTimers(userId);
  } catch (err) {
    console.error("Ошибка при отправке таймеров:", err);
  }

  ws.on("close", () => {
    clients.delete(userId);
  });
});

server.on("upgrade", async (req, socket, head) => {
  const cookies = cookie.parse(req.headers["cookie"]);
  const token = cookies && cookies["sessionId"];

  try {
    const client = await clientPromise;
    req.db = client.db("users");
    const user = await findUserBySessionId(req.db, token);
    const userId = token && user._id;

    if (!userId) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }

    req.userId = user._id;

    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit("connection", ws, req);
    });
  } catch (error) {
    console.error(error);
    socket.write("HTTP/1.1 500 Internal Server Error\r\n\r\n");
    socket.destroy();
  }
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`  Listening on http://localhost:${port}`);
});
