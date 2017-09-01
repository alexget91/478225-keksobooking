'use strict';

// Модуль для формирования данных
(function () {

  var OFFER_TYPES = {
    'bungalo': {
      name: 'Бунгало',
      minPrice: 0
    },
    'flat': {
      name: 'Квартира',
      minPrice: 1000
    },
    'house': {
      name: 'Дом',
      minPrice: 5000
    },
    'palace': {
      name: 'Дворец',
      minPrice: 10000
    }
  };
  var CHECK_IN_TIMES = ['12:00', '13:00', '14:00'];
  var CHECK_OUT_TIMES = ['12:00', '13:00', '14:00'];
  var OFFER_LOCATION_X_MIN = 0;
  var OFFER_LOCATION_X_MAX = 1200;
  var OFFER_LOCATION_Y_MIN = 200;
  var OFFER_LOCATION_Y_MAX = 670;


  window.data = {
    OFFER_TYPES: OFFER_TYPES,
    OFFER_LOCATION: {
      xMin: OFFER_LOCATION_X_MIN,
      xMax: OFFER_LOCATION_X_MAX,
      yMin: OFFER_LOCATION_Y_MIN,
      yMax: OFFER_LOCATION_Y_MAX
    },
    CHECK_IN_TIMES: CHECK_IN_TIMES,
    CHECK_OUT_TIMES: CHECK_OUT_TIMES
  };

})();
