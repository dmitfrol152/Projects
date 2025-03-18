const crypto = require("crypto");
const fs = require("fs");
const axios = require("axios");

const filename = process.argv[2];

let hashBinary;
let hashText;

function getCompare() {
  const hash = crypto.createHash("sha256");
  hash.update(hashBinary);
  const hashBinaryText = hash.digest("hex");

  if (hashText !== hashBinaryText) {
    console.error("Хеши не совпадают");
    console.log("Хеш файла:", hashBinaryText);
    console.log("Хеш, который должен быть:", hashText);
    process.exit(102);
  }

  console.log("Все прошло успешно! Хеши совпадают.");
  console.log("Хеш файла:", hashBinaryText);
  console.log("Хеш, который должен быть:", hashText);
  process.exit(0);
}

if (filename.startsWith("http://") || filename.startsWith("https://")) {
  axios
    .get(filename, { responseType: "arraybuffer" })
    .then((res) => {
      if (res.status === 404) {
        console.error("Файл не найден");
        process.exit(1);
      }
      return res.data;
    })
    .then((data) => {
      hashBinary = data;
    })
    .catch((err) => {
      console.error("Ошибка чтения исходного файла:", err);
      process.exit(100);
    })
    .then(() => {
      return axios
        .get(`${filename}.sha256`)
        .then((res) => {
          if (res.status === 404) {
            console.error("Файл не найден");
            process.exit(1);
          }
          return res.data;
        })
        .then((data) => {
          hashText = data.toString().trim();
        })
        .then(() => getCompare())
        .catch((err) => {
          console.error("Ошибка чтения хеш-файла:", err);
          process.exit(101);
        });
    });
} else {
  fs.readFile(filename, { encoding: null }, (err, data) => {
    if (err) {
      console.error("Ошибка чтения исходного файла:", err);
      process.exit(100);
    }

    hashBinary = data;

    fs.readFile(`${filename}.sha256`, "utf-8", (err, data) => {
      if (err) {
        console.error("Ошибка чтения хеш-файла", err);
        process.exit(101);
      }

      hashText = data.toString().trim();

      const hash = crypto.createHash("sha256");
      hash.update(hashBinary);
      const hashBinaryText = hash.digest("hex");

      if (hashText !== hashBinaryText) {
        console.error("Хеши не совпадают");
        console.log("Хеш файла:", hashBinaryText);
        console.log("Хеш, который должен быть:", hashText);
        process.exit(102);
      }

      console.log("Все прошло успешно! Хеши совпадают.");
      console.log("Хеш файла:", hashBinaryText);
      console.log("Хеш, который должен быть:", hashText);
      process.exit(0);
    });
  });
}
