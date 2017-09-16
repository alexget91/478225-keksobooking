'use strict';

// Фильтрация меток на карте
(function () {

  var housingType = document.querySelector('#housing_type');
  var housingPrice = document.querySelector('#housing_price');
  var housingRooms = document.querySelector('#housing_room-number');
  var housingGuests = document.querySelector('#housing_guests-number');
  var housingFeatures = document.querySelectorAll('#housing_features input[type="checkbox"]');
  var featuresChecked = [];


  var getRandomPins = function (pins, max) {
    var keys = [];

    while (keys.length < max) {
      var j = window.util.getRandomInt(0, pins.length);
      if (keys.indexOf(j) === -1) {
        keys.push(j);
      }
    }

    return keys.map(function (it) {
      return pins[it];
    });
  };

  var getFeaturesChecked = function () {
    featuresChecked = [];
    [].forEach.call(housingFeatures, function (el) {
      if (el.checked) {
        featuresChecked.push(el.value);
      }
    });
  };

  var filterByOneValue = function (pin, propValue, propName, isInt) {
    return propValue === 'any' || (isInt ? pin.offer[propName] === parseInt(propValue, 10) : pin.offer[propName] === propValue);
  };

  var filterByPrice = function (pin) {
    if (housingPrice.value !== 'any') {
      switch (housingPrice.value) {
        case 'low':
          return pin.offer.price < window.data.FILTER_PRICE_MIDDLE_START;
        case 'middle':
          return pin.offer.price >= window.data.FILTER_PRICE_MIDDLE_START && pin.offer.price < window.data.FILTER_PRICE_HIGH_START;
        case 'high':
          return pin.offer.price >= window.data.FILTER_PRICE_HIGH_START;
      }
      return false;
    }
    return true;
  };

  var filterByFeatures = function (pin) {
    getFeaturesChecked();

    if (featuresChecked.length) {
      var flag = true;
      featuresChecked.forEach(function (el) {
        if (pin.offer.features.indexOf(el) === -1) {
          flag = false;
        }
      });
      return flag;
    }
    return true;
  };

  var filterAll = function (pins) {
    return pins.filter(function (pin) {
      if (filterByOneValue(pin, housingType.value, 'type')) {
        if (filterByOneValue(pin, housingRooms.value, 'rooms', true)) {
          if (filterByOneValue(pin, housingGuests.value, 'guests', true)) {
            if (filterByPrice(pin)) {
              if (filterByFeatures(pin)) {
                return true;
              }
            }
          }
        }
      }
      return false;
    });
  };


  housingType.addEventListener('change', function () {
    window.debounce(window.map.drawPins);
  });

  housingPrice.addEventListener('change', function () {
    window.debounce(window.map.drawPins);
  });

  housingRooms.addEventListener('change', function () {
    window.debounce(window.map.drawPins);
  });

  housingGuests.addEventListener('change', function () {
    window.debounce(window.map.drawPins);
  });

  [].forEach.call(housingFeatures, function (el) {
    el.addEventListener('change', function () {
      window.debounce(window.map.drawPins);
    });
  });


  window.pinFilter = function (allPins, max) {
    var pins = [];
    getFeaturesChecked();

    if (housingType.value === 'any' && housingRooms.value === 'any' && housingGuests.value === 'any'
        && housingPrice.value === 'any' && !featuresChecked.length && typeof max !== 'undefined') {
      // Если фильтр не установлен, отображается max случайных пинов
      pins = getRandomPins(allPins, max);
    } else {
      // Иначе фильтруются все пины
      pins = filterAll(allPins);
    }

    return pins;
  };

})();
