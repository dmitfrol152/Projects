require("dotenv").config();

const express = require("express");
const { nanoid } = require("nanoid");
const crypto = require("crypto");

const { MongoClient, ObjectId } = require("mongodb");

const clientPromise = new MongoClient(process.env.DB_URL);

const app = express();

app.set("view engine", "njk");

app.use(express.json());

app.use(async (req, res, next) => {
  try {
    const client = await clientPromise;
    req.db = client.db("users");
    next();
  } catch (err) {
    next(err);
  }
});

const gatHash = (pas) => {
  const hash = crypto.createHash("sha256");
  hash.update(pas.trim());
  const hashText = hash.digest("hex");
  return hashText;
};

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
    return db.collection("users").findOne({ _id: session.userId });
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

const auth = async (req, res, next) => {
  if (!req.headers["sessionId"]) {
    return next();
  }
  const user = await findUserBySessionId(req.db, req.headers["sessionId"]);
  req.user = user;
  req.sessionId = req.headers["sessionId"];
  next();
};

// app.get("/", auth, async (req, res) => {
//   res.render("index", {
//     user: req.user,
//     authError: req.query.authError === "true" ? "Wrong username or password" : req.query.authError,
//   });
// });

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await findUserByUsername(req.db, username);
  if (!user) {
    return res.json({ error: "Такого логина не существует" });
  }
  const hashText = gatHash(password);
  if (hashText !== user.password) {
    return res.json({ error: "Пароли не совпадают" });
  }
  const sessionId = await createSessionId(req.db, user._id);
  return res.json({ sessionId });
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const findedUser = await findUserByUsername(req.db, username);

  if (!username || !password || findedUser) {
    return res.json({ error: "Вы ввели неправильный логин или пароль" });
  }

  const hashText = gatHash(password);

  const newUser = {
    username: username,
    password: hashText,
  };
  const createdUser = await createNewUser(req.db, newUser);

  const sessionId = await createSessionId(req.db, createdUser);
  return res.json({ sessionId });
});

app.get("/logout", auth, async (req, res) => {
  if (!req.user) {
    return res.json({ error: "Такого логина не существует" });
  }
  await deleteSession(req.db, req.sessionId);
  res.clearCookie("sessionId");
  return res.json({ success: true });
});

app.get("/api/timers", async (req, res) => {
  const user = await findUserBySessionId(req.db, req.headers.sessionid);
  console.log(req.headers);
  console.log(req.headers.sessionid);
  console.log(user);

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  res.json(user.timers);
});

app.post("/api/timers", async (req, res) => {
  const { description } = req.body;
  const user = await findUserBySessionId(req.db, req.headers.sessionid);

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

  res.json(newTimer);
});

app.post("/api/timers/:id/stop", async (req, res) => {
  const { id } = req.params;
  const user = await findUserBySessionId(req.db, req.headers.sessionid);

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
  res.json(modifiedTimer);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`  Listening on http://localhost:${port}`);
});
