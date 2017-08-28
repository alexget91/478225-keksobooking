'use strict';

// Модуль для работы с картой
(function () {

  var pinMap = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();

  // Отображение соседних объектов на карте
  for (var i = 0; i < window.data.similarAds.length; i++) {
    window.pin.createPin(window.data.similarAds[i], fragment, i);
  }
  pinMap.appendChild(fragment);

  // Смещение маркеров в правильное положение с учётом их размера
  var pins = pinMap.querySelectorAll('.pin:not(.pin__main)');
  for (i = 0; i < pins.length; i++) {
    pins[i].style.left = parseInt(pins[i].style.left, 10) - pins[i].offsetWidth / 2 + 'px';
    pins[i].style.top = parseInt(pins[i].style.top, 10) - pins[i].offsetHeight + 'px';
  }
})();
