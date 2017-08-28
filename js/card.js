'use strict';

// Модуль для работы со всплывающим окном на карте
(function () {

  var dialogPanelTemplate = document.querySelector('#lodge-template');
  var dialogPanelContent = dialogPanelTemplate.content ? dialogPanelTemplate.content : dialogPanelTemplate;
  var dialogPopup = document.querySelector('#offer-dialog');
  var dialogPopupClose = dialogPopup.querySelector('.dialog__close');
  var pinMap = document.querySelector('.tokyo__pin-map');

  // Создаёт всплывающее окно для метки на карте
  var createPinPopup = function (ad, template, dialog) {
    var fragment = document.createDocumentFragment();
    var dialogElement = template.cloneNode(true);

    dialogElement.querySelector('.lodge__title').textContent = ad.offer.title;
    dialogElement.querySelector('.lodge__address').textContent = ad.offer.address;
    dialogElement.querySelector('.lodge__price').innerHTML = ad.offer.price + '&#x20bd;/ночь';
    dialogElement.querySelector('.lodge__type').textContent = window.data.OFFER_TYPES[ad.offer.type].name;
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
    window.pin.deactivatePin(pinMap);
    window.pin.activatePin(pin);
    if (typeof pin.dataset.id !== 'undefined') {
      createPinPopup(window.data.similarAds[pin.dataset.id], dialogPanelContent, dialogPopup);
      popupDialogShow(dialogPopup);
    }
    document.addEventListener('keydown', onPinPopupEscPress);
  };

  var closePinPopup = function () {
    popupDialogHide(dialogPopup);
    window.pin.deactivatePin(pinMap);
    document.removeEventListener('keydown', onPinPopupEscPress);
  };

  var onPinPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePinPopup);
  };


  dialogPopupClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    closePinPopup();
  });

  dialogPopupClose.addEventListener('keydown', function (evt) {
    /* if (evt.keyCode === ENTER_KEYCODE) {
      evt.preventDefault();
      closePinPopup();
    } */
    window.util.isEnterEvent(evt, function () {
      evt.preventDefault();
      closePinPopup();
    });
  });

  pinMap.addEventListener('click', function (evt) {
    openPinPopup(evt);
  });

  pinMap.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPinPopup);
  });
})();
