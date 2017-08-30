'use strict';

// Модуль для связывания полей
(function () {

  window.synchronizeFields = function (elToRead, elToWright, readValues, wrightValues, action) {

    elToRead.addEventListener('change', function (evt) {
      if (readValues !== null && wrightValues !== null) {
        var key = readValues.indexOf(evt.target.value);
        var value = wrightValues[key];
      }
      if (value !== null) {
        action(elToWright, value);
      }
    });

  };

})();
