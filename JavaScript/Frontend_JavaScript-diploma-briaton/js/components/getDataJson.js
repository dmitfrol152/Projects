export default async function getDataJson() {

  try {
    const catalogResponse = await fetch('../data/data.json');

    if (!catalogResponse.ok) {
      throw new Error('Нет доступа или неверная ссылка' + ' ' + catalogResponse.statusText)
    }

    return await catalogResponse.json();
  
  } catch (error) {
    console.error('Ошибка при получении данных' + ' ' + error)
  }
  
}