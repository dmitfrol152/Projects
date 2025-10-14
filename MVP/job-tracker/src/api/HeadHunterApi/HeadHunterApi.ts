export async function fetchHeadHunterVacancies(
  query: string,
  page: number = 0,
  perpage: number
) {
  return fetch(
    `https://api.hh.ru/vacancies?text=${query}&page=${page}&per_page=${perpage}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error fetch hh_vacancies");
      }
      return response.json();
    })
    .then((data) => {
      if (!data) {
        throw new Error("Error respotse to data");
      }

      return data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}
