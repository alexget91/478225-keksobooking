'use strict';

// Модуль для работы со всплывающим окном на карте
(function () {

  var dialogPopup = document.querySelector('#offer-dialog');
  var dialogPopupClose = dialogPopup.querySelector('.dialog__close');
  var pinMap = document.querySelector('.tokyo__pin-map');

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
      window.showCard(pin.dataset.id);
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
