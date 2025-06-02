import inquirer from "inquirer";
import os from "os";
import path from "path";
import fs from "fs-extra";
import axios from "axios";
import dotenv from "dotenv";
import Table from "cli-table";

dotenv.config();

const homeDir = os.homedir();
const isWindows = os.type().match(/windows/i);
const sessionFileName = path.join(homeDir, `${isWindows ? "_" : "."}sb-timers-session`);
console.log("File to keep the session ID:", sessionFileName);

const command = process.argv[2];
const descriptionArgv = process.argv[3];
const timerIdArgv = process.argv[3];

switch (command) {
  case "signup":
    signup();
    break;
  case "login":
    login();
    break;
  case "logout":
    logout();
    break;
  case "start":
    start(descriptionArgv);
    break;
  case "stop":
    stop(timerIdArgv);
    break;
  case "status":
    status(timerIdArgv);
    break;
  default:
    console.log("Нет такой команды");
}

const table = new Table({
  head: ["ID", "Task", "Time"],
  colWidths: [100, 100, 100],
});

async function signup() {
  await inquirer
    .prompt([
      {
        type: "input",
        name: "username",
        message: "Введите логин: ",
        validate: (text) => text.length > 0 || "Поле обязательно для заполнения",
      },
      {
        type: "password",
        name: "password",
        message: "Введите пароль: ",
        mask: "*",
        validate: (text) => text.length > 0 || "Поле обязательно для заполнения",
      },
    ])
    .then(async (answers) => {
      const response = await axios.post(`${process.env.SERVER}/signup`, {
        username: answers.username,
        password: answers.password,
      });

      if (response.data.sessionId) {
        fs.writeFile(sessionFileName, response.data.sessionId);
        console.log("Signed up successfully!");
      } else {
        console.log("Signed up error!");
      }
    })
    .catch((error) => {
      console.error("Ошибка: ", error.message);
    });
}

async function login() {
  await inquirer
    .prompt([
      {
        type: "input",
        name: "username",
        message: "Введите логин: ",
        validate: (text) => text.length > 0 || "Поле обязательно для заполнения",
      },
      {
        type: "password",
        name: "password",
        message: "Введите пароль: ",
        mask: "*",
        validate: (text) => text.length > 0 || "Поле обязательно для заполнения",
      },
    ])
    .then(async (answers) => {
      const response = await axios.post(`${process.env.SERVER}/login`, {
        username: answers.username,
        password: answers.password,
      });

      if (response.data.sessionId) {
        await fs.writeFile(sessionFileName, response.data.sessionId);
        console.log("Logged in successfully!");
      } else {
        console.log("Wrong username or password!");
      }
    })
    .catch((error) => {
      console.error("Ошибка: ", error.message);
    });
}

async function logout() {
  try {
    const sessionId = await fs.readFile(sessionFileName, "utf-8");

    if (sessionId) {
      await fs.remove(sessionFileName);
      console.log("Сессия успешно удалена");
    } else {
      console.log("Такой сессии не существует или была удалена!");
    }
  } catch (error) {
    console.error("Ошибка: ", error.message);
  }
}

async function start(timerDescription) {
  try {
    const sessionId = await fs.readFile(sessionFileName, "utf-8");

    if (!sessionId) {
      console.log("Сессия не найдена!");
      return;
    }

    const response = await axios.post(
      `${process.env.SERVER}/api/timers`,
      { description: timerDescription ? timerDescription : "Нет описания" },
      {
        headers: {
          sessionId: sessionId,
        },
      }
    );

    if (response.data) {
      console.log(`Started timer "${timerDescription ? timerDescription : "Нет описания"}", ID: ${response.data.id}.`);
    }
  } catch (error) {
    console.log("Ошибка: ", error.message);
  }
}

async function stop(timerId) {
  try {
    const sessionId = await fs.readFile(sessionFileName, "utf-8");

    if (!sessionId) {
      console.log("Сессия не найдена!");
      return;
    }

    const response = await axios.post(
      `${process.env.SERVER}/api/timers/${timerId}/stop`,
      {},
      {
        headers: {
          sessionId: sessionId,
        },
      }
    );

    if (response.data) {
      console.log(`Timer ${response.data.timerId} stopped`);
    }
  } catch (error) {
    console.log("Ошибка: ", error.message);
  }
}

async function status(id) {
  try {
    const sessionId = await fs.readFile(sessionFileName, "utf-8");

    const response = await axios.get(`${process.env.SERVER}/api/timers`, {
      headers: {
        sessionId: sessionId,
      },
    });

    if (id === "old") {
      const filtredTimers = response.data.filter((timer) => !timer.isActive);

      if (filtredTimers.length) {
        filtredTimers.forEach((timer) => {
          const duration = Date.now() - timer.start;
          const minutes = Math.floor(duration / 60000);
          const seconds = Math.floor((duration % 60000) / 1000);
          table.push([
            timer.timerId,
            timer.description,
            `${minutes.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`,
          ]);
        });
        console.log(table.toString());
      } else {
        console.log("You have no old timers");
      }
    } else {
      if (response.data && !id) {
        const filtredTimers = response.data.filter((timer) => timer.isActive);
        if (filtredTimers.length) {
          filtredTimers.forEach((timer) => {
            const duration = Date.now() - timer.start;
            const minutes = Math.floor(duration / 60000);
            const seconds = Math.floor((duration % 60000) / 1000);
            table.push([
              timer.timerId,
              timer.description,
              `${minutes.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`,
            ]);
          });
          console.log(table.toString());
        } else {
          console.log("You have no active timers");
        }
      }

      if (response.data && id) {
        const filtredTimers = response.data.filter((timer) => timer.timerId === id);
        if (filtredTimers.length) {
          if (filtredTimers[0].isActive) {
            const duration = Date.now() - filtredTimers[0].start;
            const minutes = Math.floor(duration / 60000);
            const seconds = Math.floor((duration % 60000) / 1000);
            table.push([
              filtredTimers[0].timerId,
              filtredTimers[0].description,
              `${minutes.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`,
            ]);
            console.log(table.toString());
          } else {
            table.push([
              filtredTimers[0].timerId,
              filtredTimers[0].description,
              `${Math.floor(filtredTimers[0].duration / 60000)
                .toString()
                .padStart(2, "0")} : ${Math.floor((filtredTimers[0].duration % 60000) / 1000)
                .toString()
                .padStart(2, "0")}`,
            ]);
            console.log(table.toString());
          }
        } else {
          console.log(`Unknown timer ID ${id}`);
        }
      }
    }
  } catch (error) {
    console.log("Ошибка: ", error.message);
  }
}
