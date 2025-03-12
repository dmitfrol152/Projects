export default function getAccordion() {
  const accordionBtnElements = document.querySelectorAll('.accordion__btn');

  accordionBtnElements.forEach(element => {
    element.addEventListener('click', () => {
      const isActive = element.classList.contains('accordion__btn--active')
      accordionBtnElements.forEach(accordion => {
        if (accordion.classList.contains('accordion__btn--active')) {
          accordion.classList.remove('accordion__btn--active');
        }
      });
      if (!isActive) {
        element.classList.add('accordion__btn--active');
      }
    })
  })
}
