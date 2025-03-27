const { argv } = require("process");
const axios = require("axios");

if (argv.length <= 2) {
  console.error(`Вы не передали ни одного аргумента`);
  process.exit(1);
}

const getSearchName = async (args) => {
  let personsArray = [];
  await Promise.all(
    args.splice(2).map((arg) => {
      return axios
        .get(`https://www.swapi.tech/api/people/?name=${arg}`)
        .then((response) => {
          if (!response.data.result.length) {
            const error = new TypeError(`No results found for "${arg}"`);
            throw error;
          } else {
            personsArray.push({
              personName: response.data.result[0].properties.name,
              personHeight: response.data.result[0].properties.height,
            });
            return;
          }
        })
        .catch((error) => {
          if (error.name === "TypeError") {
            console.error(error);
            return null;
          }
          throw error;
        });
    })
  );

  if (!personsArray.length) {
    console.error("Нет совпадений ни по одному запросу");
  } else {
    const reultPersonCount = personsArray.length;
    const resultPersonNames = [...personsArray]
      .sort((personOne, personTwo) => personOne.personName > personTwo.personName)
      .map((person) => person.personName)
      .join(", ");
    const resultPersonHeightMin = [...personsArray].sort(
      (personOne, personTwo) => personOne.personHeight - personTwo.personHeight
    )[0];
    const resultPersonHeightMax = [...personsArray].sort(
      (personOne, personTwo) => personTwo.personHeight - personOne.personHeight
    )[0];

    console.log(`
    Total results: ${reultPersonCount}.

    All: ${resultPersonNames}.

    Min height: ${resultPersonHeightMin.personName}, ${resultPersonHeightMin.personHeight} cm.

    Max height: ${resultPersonHeightMax.personName}, ${resultPersonHeightMax.personHeight} cm.
      `);
  }
};

getSearchName(argv);
