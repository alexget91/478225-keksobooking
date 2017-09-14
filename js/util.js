'use strict';

// Модуль вспомогательных функций
(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;


  window.util = {
    // Возвращает случайное целое число между min (включительно) и max (зависит от includeMax)
    getRandomInt: function (min, max, includeMax) {
      if (typeof includeMax !== 'undefined') {
        max++;
      }
      return Math.floor(Math.random() * (max - min)) + min;
    },
    // Действие по нажатию Esc
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action(evt);
      }
    },
    // Действие по нажатию Enter
    isEnterEvent: function (evt, action, params) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action(evt, params);
      }
    }
  };

})();
