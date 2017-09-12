'use strict';

// Модуль для работы со всплывающим окном на карте
(function () {

  var dialogPopup = document.querySelector('#offer-dialog');
  var dialogPopupClose = dialogPopup.querySelector('.dialog__close');

  var popupDialogShow = function (dialog) {
    dialog.classList.remove('hidden');
  };

  var popupDialogHide = function (dialog) {
    dialog.classList.add('hidden');
  };

  var onPinPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, window.card.closePinPopup);
  };


  dialogPopupClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.card.closePinPopup();
  });

  dialogPopupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, function () {
      evt.preventDefault();
      window.card.closePinPopup();
    });
  });


  window.card = {
    openPinPopup: function (evt) {
      var pin = evt.target.tagName === 'IMG' ? evt.target.parentElement : evt.target;
      window.pin.deactivatePin();
      window.pin.activatePin(pin);
      if (typeof pin.dataset.id !== 'undefined') {
        window.showCard(pin.dataset.id);
        popupDialogShow(dialogPopup);
      }
      document.addEventListener('keydown', onPinPopupEscPress);
    },
    closePinPopup: function () {
      popupDialogHide(dialogPopup);
      window.pin.deactivatePin();
      document.removeEventListener('keydown', onPinPopupEscPress);
    }
  };

})();
