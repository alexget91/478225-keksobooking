'use strict';

// Модуль для формирования данных
(function () {

  window.data = {
    OFFER_TYPES: {
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
    },
    OFFER_LOCATION: {
      xMin: 0,
      xMax: 1200,
      yMin: 200,
      yMax: 670
    },
    CHECK_IN_TIMES: ['12:00', '13:00', '14:00'],
    CHECK_OUT_TIMES: ['12:00', '13:00', '14:00'],
    FILTER_PRICE_MIDDLE_START: 10000,
    FILTER_PRICE_HIGH_START: 50000
  };

})();
