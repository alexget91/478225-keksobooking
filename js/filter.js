'use strict';

// Фильтрация меток на карте
(function () {

  var housingType = document.querySelector('#housing_type');
  var housingPrice = document.querySelector('#housing_price');
  var housingRooms = document.querySelector('#housing_room-number');
  var housingGuests = document.querySelector('#housing_guests-number');
  var housingFeatures = document.querySelectorAll('#housing_features input[type="checkbox"]');

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
    var featuresChecked = [];
    for (var i = 0; i < housingFeatures.length; i++) {
      if (housingFeatures[i].checked) {
        featuresChecked.push(housingFeatures[i].value);
      }
    }

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

  var filtration = function () {
    var pins = window.map.allPins.filter(function (pin) {
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

    window.map.drawPins(pins);
    window.card.closePinPopup();
  };


  housingType.addEventListener('change', function () {
    window.debounce(filtration);
  });

  housingPrice.addEventListener('change', function () {
    window.debounce(filtration);
  });

  housingRooms.addEventListener('change', function () {
    window.debounce(filtration);
  });

  housingGuests.addEventListener('change', function () {
    window.debounce(filtration);
  });

  for (var i = 0; i < housingFeatures.length; i++) {
    housingFeatures[i].addEventListener('change', function () {
      window.debounce(filtration);
    });
  }

})();
