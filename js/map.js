'use strict';

// Модуль для работы с картой
(function () {

  var pinMap = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();

  // Перемещение маркера к координатам с учётом его размера
  var pinToXY = function (pin, x, y) {
    pin.style.left = parseInt(x, 10) - Math.floor(pin.offsetWidth / 2) + 'px';
    pin.style.top = parseInt(y, 10) - pin.offsetHeight + 'px';
  };

  // Отображение соседних объектов на карте
  for (var i = 0; i < window.data.similarAds.length; i++) {
    window.pin.createPin(window.data.similarAds[i], fragment, i);
  }
  pinMap.appendChild(fragment);

  // Смещение маркеров в правильное положение с учётом их размера
  var pins = pinMap.querySelectorAll('.pin:not(.pin__main)');
  for (i = 0; i < pins.length; i++) {
    pinToXY(pins[i], pins[i].style.left, pins[i].style.top);
  }


  // Перетаскивание главного маркера

  var mainPin = pinMap.querySelector('.pin__main');
  var noticeFormAddress = document.querySelector('#address');

  var setNoticeAddress = function (x, y) {
    noticeFormAddress.value = 'x: ' + x + ', y: ' + y;
  };

  var checkPinCoords = function (x, y) {
    if (x >= window.data.OFFER_LOCATION.xMin
        && x <= window.data.OFFER_LOCATION.xMax
        && y >= window.data.OFFER_LOCATION.yMin
        && y <= window.data.OFFER_LOCATION.yMax) {
      return true;
    } else {
      return false;
    }
  };

  var movePin = function (pin, shift) {
    var coordTop = pin.offsetTop;
    var coordLeft = pin.offsetLeft;
    if (typeof shift !== 'undefined') {
      coordTop -= shift.y;
      coordLeft -= shift.x;
    }
    var addrX = coordLeft + Math.floor(pin.offsetWidth / 2);
    var addrY = coordTop + pin.offsetHeight;
    if (checkPinCoords(addrX, addrY)) {
      pin.style.top = coordTop + 'px';
      pin.style.left = coordLeft + 'px';
      setNoticeAddress(addrX, addrY);
    }
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    movePin(mainPin);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      movePin(mainPin, shift);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Перемещение главного маркера при ручном вводе адреса
  noticeFormAddress.addEventListener('input', function () {
    var addrCoords = noticeFormAddress.value.match(/x: ([0-9]+), y: ([0-9]+)/);
    if (addrCoords !== null) {
      if (checkPinCoords(addrCoords[1], addrCoords[2])) {
        pinToXY(mainPin, addrCoords[1], addrCoords[2]);
        noticeFormAddress.style.borderColor = '';
      } else {
        noticeFormAddress.style.borderColor = 'red';
      }
    } else {
      noticeFormAddress.style.borderColor = 'red';
    }
  });

})();
