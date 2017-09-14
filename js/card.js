'use strict';

// Модуль для работы со всплывающим окном на карте
(function () {

  var dialogPopup = document.querySelector('#offer-dialog');
  var dialogPopupClose = dialogPopup.querySelector('.dialog__close');

  var pinActivate = function (pin) {
    pin.classList.add('pin--active');
  };

  var pinDeactivate = function () {
    var pin = document.querySelector('.tokyo__pin-map .pin--active');
    if (pin !== null) {
      pin.classList.remove('pin--active');
    }
  };

  var popupDialogShow = function (dialog) {
    dialog.classList.remove('hidden');
  };

  var popupDialogHide = function (dialog) {
    dialog.classList.add('hidden');
  };

  var onPinPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, window.card.close);
  };


  dialogPopupClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.card.close();
  });

  dialogPopupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, function () {
      evt.preventDefault();
      window.card.close();
    });
  });


  window.card = {
    open: function (evt, pin) {
      var pinElement = evt.target.tagName === 'IMG' ? evt.target.parentElement : evt.target;
      pinDeactivate();
      pinActivate(pinElement);
      window.showCard(pin);
      popupDialogShow(dialogPopup);
      document.addEventListener('keydown', onPinPopupEscPress);
    },

    close: function () {
      popupDialogHide(dialogPopup);
      pinDeactivate();
      document.removeEventListener('keydown', onPinPopupEscPress);
    }
  };

})();
