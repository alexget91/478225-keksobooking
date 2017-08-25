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
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
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


// Возвращает случайное целое число между min (включительно) и max (зависит от includeMax)
var getRandomInt = function (min, max, includeMax) {
  if (typeof includeMax !== 'undefined') {
    max++;
  }
  return Math.floor(Math.random() * (max - min)) + min;
};

// Создаёт DOM-элемент для метки на карте
var createPin = function (ad, fragment, id) {
  var div = document.createElement('div');
  div.className = 'pin';
  if (typeof id !== 'undefined') {
    div.dataset.id = id;
  }
  var divStyles = getComputedStyle(div);
  div.style.left = ad.location.x - parseInt(divStyles.width, 10) / 2 + 'px';
  div.style.top = ad.location.y - parseInt(divStyles.height, 10) + 'px';
  var img = document.createElement('img');
  img.className = 'rounded';
  img.width = 40;
  img.height = 40;
  img.src = ad.author.avatar;
  img.tabIndex = 0;
  div.appendChild(img);
  fragment.appendChild(div);
};

var activatePin = function (pin) {
  pin.classList.add('pin--active');
};

var deactivatePin = function (map) {
  var pinActive = map.querySelector('.pin--active');
  if (pinActive) {
    pinActive.classList.remove('pin--active');
  }
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

var popupDialogShow = function (dialog) {
  dialog.classList.remove('hidden');
};

var popupDialogHide = function (dialog) {
  dialog.classList.add('hidden');
};

var openPinPopup = function (evt) {
  var pin = evt.target.tagName === 'IMG' ? evt.target.parentElement : evt.target;
  deactivatePin(pinMap);
  activatePin(pin);
  if (typeof pin.dataset.id !== 'undefined') {
    createPinPopup(similarAds[pin.dataset.id], dialogPanelContent, dialogPopup);
    popupDialogShow(dialogPopup);
  }
  document.addEventListener('keydown', onPinPopupEscPress);
};

var closePinPopup = function () {
  popupDialogHide(dialogPopup);
  deactivatePin(pinMap);
  document.removeEventListener('keydown', onPinPopupEscPress);
};

var onPinPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePinPopup();
  }
};

var similarAds = [];
// Формирование массива соседних объявлений
for (var i = 0; i < SIMILAR_OFFER_NUMBER; i++) {
  var avatarNumber = i < 9 ? '0' + (i + 1) : '' + (i + 1); // добавление ведущего нуля для чисел < 9
  var titleNumber = getRandomInt(0, AD_TITLES.length);
  var offerLocation = {
    x: getRandomInt(OFFER_LOCATION_X_MIN, OFFER_LOCATION_X_MAX, true),
    y: getRandomInt(OFFER_LOCATION_Y_MIN, OFFER_LOCATION_Y_MAX, true)
  };
  // Получаем массив случайной длины из случайных значений FEATURES (offerFeatures)
  var featuresLength = getRandomInt(OFFER_FEAUTERS_LENGTH_MIN, FEATURES.length);
  var objFeatures = {};
  while (Object.keys(objFeatures).length < featuresLength) {
    var item = FEATURES[getRandomInt(OFFER_FEAUTERS_LENGTH_MIN, FEATURES.length)];
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
      price: getRandomInt(OFFER_PRICE_MIN, OFFER_PRICE_MAX, true),
      type: AD_TITLES[titleNumber].type,
      rooms: getRandomInt(OFFER_ROOMS_MIN, OFFER_ROOMS_MAX, true),
      guests: getRandomInt(OFFER_GUESTS_MIN, OFFER_GUESTS_MAX, true),
      checkin: CHECK_IN_TIMES[getRandomInt(0, CHECK_IN_TIMES.length)],
      checkout: CHECK_OUT_TIMES[getRandomInt(0, CHECK_OUT_TIMES.length)],
      features: offerFeatures,
      description: '',
      photos: []
    },
    location: offerLocation
  };
}

// Отображение соседних объектов на карте
var fragment = document.createDocumentFragment();
for (i = 0; i < similarAds.length; i++) {
  createPin(similarAds[i], fragment, i);
}
var pinMap = document.querySelector('.tokyo__pin-map');
pinMap.appendChild(fragment);


var dialogPanelTemplate = document.querySelector('#lodge-template');
var dialogPanelContent = dialogPanelTemplate.content ? dialogPanelTemplate.content : dialogPanelTemplate;
var dialogPopup = document.querySelector('#offer-dialog');
var dialogPopupClose = dialogPopup.querySelector('.dialog__close');

pinMap.addEventListener('click', function (evt) {
  openPinPopup(evt);
});

pinMap.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPinPopup(evt);
  }
});

dialogPopupClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  closePinPopup();
});

dialogPopupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    evt.preventDefault();
    closePinPopup();
  }
});
