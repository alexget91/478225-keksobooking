'use strict';

var OFFER_TYPES = {
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
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


// Возвращает случайное целое число между min (включительно) и max (не включая max)
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Создаёт DOM-элемент для метки на карте
var createPin = function (ad, fragment) {
  var div = document.createElement('div');
  div.className = 'pin';
  var divStyles = getComputedStyle(div);
  div.style.left = ad.location.x - parseInt(divStyles.width, 10) / 2 + 'px';
  div.style.top = ad.location.y - parseInt(divStyles.height, 10) + 'px';
  var img = document.createElement('img');
  img.className = 'rounded';
  img.width = 40;
  img.height = 40;
  img.src = ad.author.avatar;
  div.appendChild(img);
  fragment.appendChild(div);
};

// Создаёт всплывающее окно для метки на карте
var createPinPopup = function (ad, template, dialog) {
  var fragment = document.createDocumentFragment();
  var dialogElement = template.cloneNode(true);

  dialogElement.querySelector('.lodge__title').textContent = ad.offer.title;
  dialogElement.querySelector('.lodge__address').textContent = ad.offer.address;
  dialogElement.querySelector('.lodge__price').innerHTML = ad.offer.price + '&#x20bd;/ночь';
  dialogElement.querySelector('.lodge__type').textContent = OFFER_TYPES[ad.offer.type];
  dialogElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + ad.offer.guests + ' гостей в ' + ad.offer.rooms + ' комнатах';
  dialogElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  var feautersElement = dialogElement.querySelector('.lodge__features');
  for (var i = 0; i < ad.offer.features.length; i++) {
    feautersElement.innerHTML += '<span class="feature__image feature__image--' + ad.offer.features[i] + '"></span>';
  }
  dialogElement.querySelector('.lodge__description').textContent = ad.offer.description;

  fragment.appendChild(dialogElement);

  dialog.replaceChild(fragment, dialog.querySelector('.dialog__panel'));
  dialog.querySelector('.dialog__title img').src = ad.author.avatar;
};


var similarAds = [];

for (var i = 0; i < 8; i++) {
  var avatarNumber = i < 9 ? '0' + (i + 1) : '' + (i + 1);
  var titleNumber = getRandomInt(0, AD_TITLES.length);
  var offerLocation = {
    x: getRandomInt(300, 900),
    y: getRandomInt(100, 500)
  };
  // Получаем массив случайной длины из случайных значений FEATURES (offerFeatures)
  var featuresLength = getRandomInt(1, FEATURES.length);
  var objFeatures = {};
  while (Object.keys(objFeatures).length < featuresLength) {
    var item = FEATURES[getRandomInt(1, FEATURES.length)];
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
      price: getRandomInt(1000, 1000000),
      type: AD_TITLES[titleNumber].type,
      rooms: getRandomInt(1, 6),
      guests: getRandomInt(1, 9),
      checkin: CHECK_IN_TIMES[getRandomInt(0, CHECK_IN_TIMES.length)],
      checkout: CHECK_OUT_TIMES[getRandomInt(0, CHECK_OUT_TIMES.length)],
      features: offerFeatures,
      description: '',
      photos: []
    },
    location: offerLocation
  };
}

var fragment = document.createDocumentFragment();
for (i = 0; i < similarAds.length; i++) {
  createPin(similarAds[i], fragment);
}
var pinMap = document.querySelector('.tokyo__pin-map');
pinMap.appendChild(fragment);

var dialogPanelTemplate = document.querySelector('#lodge-template');
var dialogPanelContent = dialogPanelTemplate.content ? dialogPanelTemplate.content : dialogPanelTemplate;
var dialogPopup = document.querySelector('#offer-dialog');
createPinPopup(similarAds[0], dialogPanelContent, dialogPopup);
