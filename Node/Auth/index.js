const express = require("express");
const nunjucks = require("nunjucks");
const { nanoid } = require("nanoid");
const ms = require("ms");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");

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

// You can use these initial data
/*
const TIMERS = [
  {
    start: Date.now(),
    description: "Timer 1",
    isActive: true,
    id: nanoid(),
    progress: 0,
  },
  {
    start: Date.now() - 5000,
    end: Date.now() - 3000,
    duration: 2000,
    description: "Timer 0",
    isActive: false,
    id: nanoid(),
  },
];
*/

// const DB = {
//   users: [
//     {
//       _id: nanoid(),
//       username: "admin",
//       password: hash("pwd007"),
//     },
//   ],
//   sessions: {},
//   timers: [],
// };

const DB = {
  users: [],
  sessions: {},
  timers: [],
};
const TIMERS_API = "/api/timers";

const gatHash = (pas) => {
  const hash = crypto.createHash("sha256");
  hash.update(pas.trim());
  const hashText = hash.digest("hex");
  return hashText;
};

const getActiveTimers = () => DB.timers.filter((timer) => timer.isActive);
const getOldTimers = () => DB.timers.filter((timer) => !timer.isActive);

const findUserByUsername = async (username) => DB.users.find((user) => user.username === username);
const findUserBySessionId = async (sessionId) => {
  const userId = DB.sessions[sessionId];
  if (!userId) {
    return;
  } else {
    return DB.users.find((user) => user._id === userId);
  }
};
const createSessionId = async (userId) => {
  const sessionId = nanoid();
  DB.sessions[sessionId] = userId;
  return sessionId;
};
const deleteSession = async (sessionId) => {
  delete DB.sessions[sessionId];
};

app.use(cookieParser());

const auth = (req, res, next) => {
  if (!req.cookies["sessionId"]) {
    return next();
  }
  const user = findUserBySessionId(req.cookies["sessionId"]);
  req.user = user;
  req.sessionId = req.cookies["sessionId"];
  next();
};

app.get("/", auth, (req, res) => {
  res.render("index", {
    user: req.user,
    authError: req.query.authError === "true" ? "Wrong username or password" : req.query.authError,
  });
});

app.post("/login", bodyParser.urlencoded({ extended: false }), async (req, res) => {
  const { username, password } = req.body;
  const user = await findUserByUsername(username);
  console.log(DB);
  if (!user) {
    return res.redirect("/?authError=true");
  }
  const hashText = gatHash(password);
  if (hashText !== user.password) {
    return res.redirect("/?authError=true");
  }
  const sessionId = await createSessionId(user._id);
  res.cookie("sessionId", sessionId, { httpOnly: true }).redirect("/");
});

app.post("/signup", bodyParser.urlencoded({ extended: false }), async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password || DB.users.find((user) => user.username === username)) {
    return res.redirect("/?authError=true");
  }

  const hashText = gatHash(password);

  const user = {
    _id: nanoid(),
    username: username,
    password: hashText,
  };
  DB.users.push(user);

  const sessionId = await createSessionId(user._id);
  console.log(DB);
  res.cookie("sessionId", sessionId, { httpOnly: true }).redirect("/");
});

app.get("/logout", auth, async (req, res) => {
  if (!req.user) {
    return res.redirect("/");
  }
  await deleteSession(req.sessionId);
  res.clearCookie("sessionId").redirect("/");
});

app.get(TIMERS_API, (req, res) => {
  if (req.query.isActive === "true") {
    const activeTimers = getActiveTimers();
    res.json(activeTimers);
  } else {
    const oldTimers = getOldTimers();
    res.json(oldTimers);
  }
});

app.post("/api/timers", (req, res) => {
  const { description } = req.body;
  const timer = {
    start: Date.now(),
    description: description,
    isActive: true,
    id: nanoid(),
    progress: 0,
  };
  DB.timers.push(timer);
  setInterval(() => {
    timer.progress += ms("1s");
  }, 1000);
  res.json(timer);
});

app.post("/api/timers/:id/stop", (req, res) => {
  const { id } = req.params;
  const timer = DB.timers.find((timer) => timer.id === id);
  timer.end = Date.now();
  timer.duration = timer.end - timer.start;
  timer.isActive = false;
  res.json(timer);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`  Listening on http://localhost:${port}`);
});
