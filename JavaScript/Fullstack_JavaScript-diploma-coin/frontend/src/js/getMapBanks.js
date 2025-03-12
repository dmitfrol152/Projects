export async function getMapBanks(isToken) {

  const app = document.querySelector('.app');
  app.innerHTML = '';
  app.innerHTML = `
      <div class="map-banks">
        <div class="container">
          <h2 class="map-banks__title">Карта банкоматов</h2>
          <div class="map-banks__wrapper">

          </div>
        </div>
      </div>
    `

  try {

    const response = await fetch('http://localhost:3000/banks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Basic ${isToken}`,
      },
    })

    if (response.ok) {

      const data = await response.json();

      // load map
      const mapContainer = app.querySelector('.map-banks__wrapper');
      ymaps.ready(init);
      function init() {
        const myMap = new ymaps.Map(mapContainer, {
          center: [55.76, 37.64],
          zoom: 11
        });

        getMapBanksMarkers(data, myMap);

      }

    }

  } catch (error) {
    console.error(`Ошибка: ${error.message}`);
  }

}

function getMapBanksMarkers(data, myMap) {

  const banksMarkersArray = data.payload;

  banksMarkersArray.forEach(marker => {

    myMap.geoObjects
    .add(new ymaps.Placemark([marker.lat, marker.lon], {
      balloonContent: 'Coin.'
    }, {
      preset: 'islands#icon',
      iconColor: '#0095b6'
    }))

  });

}
