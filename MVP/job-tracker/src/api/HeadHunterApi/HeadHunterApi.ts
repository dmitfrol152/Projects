export async function fetchHeadHunterVacancies(
  query: string,
  page: number = 0,
  perpage: number,
  salary?: number | null,
  experience?: string,
  orderBy?: string,
  city?: string
) {
  return fetch(
    `https://api.hh.ru/vacancies?text=${query}&page=${page}&per_page=${perpage}${getAdditionParams(
      salary,
      experience,
      orderBy,
      city
    )}`
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

function getAdditionParams(
  salary?: number | null,
  experience?: string,
  orderBy?: string,
  city?: string
) {
  let params = "";
  if (salary && salary !== null) {
    params += `&salary=${salary}`;
  }
  if (experience) {
    params += `&experience=${experience}`;
  }
  if (orderBy) {
    params += `&order_by=${orderBy}`;
  }
  if (city) {
    params += `&area=${city}`;
  }

  return params;
}
