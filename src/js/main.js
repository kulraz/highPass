

var myMap;

ymaps.ready(init);

function init () {
    myMap = new ymaps.Map('map', {
        center: [55.759661, 37.628460],
        zoom: 13,
        controls: [],
    }, {
        searchControlProvider: 'yandex#search',
        autoFitToViewport: 'always'
    })
    myPlacemark = new ymaps.Placemark([55.769591, 37.639912], {
      hintContent: 'нажми на меня',
    }, {
      iconLayout: 'default#image',
      // Своё изображение иконки метки.
      iconImageHref: 'images/map.png',
      iconImageSize: [15, 15]
    });
    myPlacemark.events.add('click', () => {
      document.querySelector('.dropdown').classList.add('dropdown--active');
    })
    myMap.geoObjects.add(myPlacemark)
    document.querySelector('.dropdown__close-btn').addEventListener('click', () => {
      document.querySelector('.dropdown').classList.remove('dropdown--active');
    })
}

let btn = document.querySelector('.header__search-btn');

btn.addEventListener('click', function() {
  document.querySelector('.header__search-container').classList.add('active');
  document.querySelector('.header__search-btn').classList.add('none');
})

document.querySelector('.header__close-btn').addEventListener('click', function(e) {
    document.querySelector('.header__search-container').classList.remove('active');
    document.querySelector('.header__search-btn').classList.remove('none');
})

document.querySelector('.burger').addEventListener('click', function(e) {
  document.querySelector('.burger-menu').classList.add('burger-menu--active');
  document.querySelector('body').classList.add('stop-scroll');
})

document.querySelector('.burger__close-btn').addEventListener('click', ()=> {
  document.querySelector('.burger-menu').classList.remove('burger-menu--active');
  document.querySelector('body').classList.remove('stop-scroll');
})


document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault();
})

document.querySelector('.about-us__form').addEventListener('submit', (e) => {
  e.preventDefault();
})


const validation = new JustValidate(
   '#form',
   {
     errorFieldCssClass: 'validate',
     errorLabelCssClass: 'error-label',
     errorLabelStyle: {color: '#FF3030'}
   },
);

validation
  .addField('#name', [
    {
      rule: 'required',
      errorMessage: 'Обязательное поле',
    },
  ])
  .addField('#email', [
    {
      rule: 'required',
      errorMessage: 'Обязательное поле',
    },
    {
      rule: 'email',
      errorMessage: 'Недопустимый формат',
    },
  ])


  const validationFirst = new JustValidate(
  '#aboutUsForm', {
   errorFieldCssClass: 'validate',
    errorLabelCssClass: 'error-label',
    errorLabelStyle: {color: '#FF3030'}
  }
);
validationFirst.addField('#about-us', [
  {
    rule: 'required',
    errorMessage: 'Обязательное поле',
  },
  {
    rule: 'email',
    errorMessage: 'Недопустимый формат',
  },
]);
