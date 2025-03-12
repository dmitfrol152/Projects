import closeChoiceCity from './closeChoiceCity.js';

export default function getChoiceCity() {
  const selectCityBtn = document.querySelector('.location__city');
  const selectCityBtnText = document.querySelector('.location__city-name');
  const searchAllCitiesBtn = document.querySelectorAll('.location__sublink');

  selectCityBtn.addEventListener('click', () => {
    if (!selectCityBtn.classList.contains('location__city--active')) {
      selectCityBtn.classList.add('location__city--active');
    } else {
      closeChoiceCity();
    }
  
    searchAllCitiesBtn.forEach(btn => {
      btn.addEventListener('click', () => {
        if (selectCityBtn.textContent === btn.textContent) {
          closeChoiceCity();
        } else {
          selectCityBtnText.textContent = btn.textContent;
          closeChoiceCity();
        }
      })
    })
  });
 
}