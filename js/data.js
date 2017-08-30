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
  var AD_TITLES = [
    {
      title: 'Большая уютная квартира',
      type: 'flat'
    },
    {
      title: 'Маленькая неуютная квартира',
      type: 'flat'
    },
    {
      title: 'Огромный прекрасный дворец',
      type: 'house'
    },
    {
      title: 'Маленький ужасный дворец',
      type: 'house'
    },
    {
      title: 'Красивый гостевой домик',
      type: 'house'
    },
    {
      title: 'Некрасивый негостеприимный домик',
      type: 'house'
    },
    {
      title: 'Уютное бунгало далеко от моря',
      type: 'bungalo'
    },
    {
      title: 'Неуютное бунгало по колено в воде',
      type: 'bungalo'
    },
  ];
  var CHECK_IN_TIMES = ['12:00', '13:00', '14:00'];
  var CHECK_OUT_TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var SIMILAR_OFFER_NUMBER = 8;
  var OFFER_LOCATION_X_MIN = 300;
  var OFFER_LOCATION_X_MAX = 900;
  var OFFER_LOCATION_Y_MIN = 100;
  var OFFER_LOCATION_Y_MAX = 500;
  var OFFER_PRICE_MIN = 1000;
  var OFFER_PRICE_MAX = 1000000;
  var OFFER_ROOMS_MIN = 1;
  var OFFER_ROOMS_MAX = 5;
  var OFFER_GUESTS_MIN = 1;
  var OFFER_GUESTS_MAX = 8;
  var OFFER_FEAUTERS_LENGTH_MIN = 1;


  var similarAds = [];
  // Формирование массива соседних объявлений
  for (var i = 0; i < SIMILAR_OFFER_NUMBER; i++) {
    var avatarNumber = i < 9 ? '0' + (i + 1) : '' + (i + 1); // добавление ведущего нуля для чисел < 9
    var titleNumber = window.util.getRandomInt(0, AD_TITLES.length);
    var offerLocation = {
      x: window.util.getRandomInt(OFFER_LOCATION_X_MIN, OFFER_LOCATION_X_MAX, true),
      y: window.util.getRandomInt(OFFER_LOCATION_Y_MIN, OFFER_LOCATION_Y_MAX, true)
    };
    // Получаем массив случайной длины из случайных значений FEATURES (offerFeatures)
    var featuresLength = window.util.getRandomInt(OFFER_FEAUTERS_LENGTH_MIN, FEATURES.length);
    var objFeatures = {};
    while (Object.keys(objFeatures).length < featuresLength) {
      var item = FEATURES[window.util.getRandomInt(OFFER_FEAUTERS_LENGTH_MIN, FEATURES.length)];
      objFeatures[item] = true;
    }
    var offerFeatures = Object.keys(objFeatures);

    similarAds[i] = {
      author: {
        avatar: 'img/avatars/user' + avatarNumber + '.png'
      },
      offer: {
        title: AD_TITLES[titleNumber].title,
        address: offerLocation.x + ', ' + offerLocation.y,
        price: window.util.getRandomInt(OFFER_PRICE_MIN, OFFER_PRICE_MAX, true),
        type: AD_TITLES[titleNumber].type,
        rooms: window.util.getRandomInt(OFFER_ROOMS_MIN, OFFER_ROOMS_MAX, true),
        guests: window.util.getRandomInt(OFFER_GUESTS_MIN, OFFER_GUESTS_MAX, true),
        checkin: CHECK_IN_TIMES[window.util.getRandomInt(0, CHECK_IN_TIMES.length)],
        checkout: CHECK_OUT_TIMES[window.util.getRandomInt(0, CHECK_OUT_TIMES.length)],
        features: offerFeatures,
        description: '',
        photos: []
      },
      location: offerLocation
    };


    window.data = {
      OFFER_TYPES: OFFER_TYPES,
      OFFER_LOCATION: {
        xMin: OFFER_LOCATION_X_MIN,
        xMax: OFFER_LOCATION_X_MAX,
        yMin: OFFER_LOCATION_Y_MIN,
        yMax: OFFER_LOCATION_Y_MAX
      },
      CHECK_IN_TIMES: CHECK_IN_TIMES,
      CHECK_OUT_TIMES: CHECK_OUT_TIMES,
      similarAds: similarAds
    };
  }

})();
