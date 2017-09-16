'use strict';

// Модуль для работы с картой
(function () {

  var allPins = [];
  var pinMap = document.querySelector('.tokyo__pin-map');
  var filterContainer = document.querySelector('.tokyo__filters-container');

  // Перемещение маркера к координатам с учётом его размера
  var pinToXY = function (pin, x, y) {
    pin.style.left = parseInt(x, 10) - Math.floor(pin.offsetWidth / 2) + 'px';
    pin.style.top = parseInt(y, 10) - pin.offsetHeight + 'px';
  };

  var onLoadSuccess = function (data) {
    allPins = data.map(function (it) {
      return new window.Pin(it);
    });
    window.map.drawPins(window.data.START_PINS_NUMBER);
    filterContainer.classList.remove('hidden');
  };


  filterContainer.classList.add('hidden');

  // Отображение маркеров на карте
  window.backend.load(onLoadSuccess, window.backend.onLoadError);

  // Перетаскивание главного маркера

  var mainPin = pinMap.querySelector('.pin__main');
  var noticeFormAddress = document.querySelector('#address');

  var setNoticeAddress = function (x, y) {
    noticeFormAddress.value = 'x: ' + x + ', y: ' + y;
  };

  var checkPinCoords = function (x, y) {
    return x >= window.data.OFFER_LOCATION.xMin
      && x <= window.data.OFFER_LOCATION.xMax
      && y >= window.data.OFFER_LOCATION.yMin
      && y <= window.data.OFFER_LOCATION.yMax;
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


  window.map = {
    drawPins: function (max) {
      var fragment = document.createDocumentFragment();
      var selector = '.pin:not(.pin__main)';

      [].forEach.call(pinMap.querySelectorAll(selector), function (it) {
        it.remove();
      });

      window.card.close();

      window.pinFilter(allPins, max).forEach(function (el) {
        fragment.appendChild(el.buildElement());
      });

      pinMap.appendChild(fragment);

      // Смещение маркеров в правильное положение с учётом их размера
      [].forEach.call(pinMap.querySelectorAll(selector), function (it) {
        pinToXY(it, it.style.left, it.style.top);
      });
    }
  };

})();
