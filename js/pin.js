'use strict';

// Модуль для отрисовки меток на карте и взаимодействия с ними
(function () {

  window.pin = {
    // Создаёт DOM-элемент для метки на карте
    createPin: function (ad, fragment, id) {
      var div = document.createElement('div');
      div.className = 'pin';
      if (typeof id !== 'undefined') {
        div.dataset.id = id;
      }
      div.style.left = ad.location.x + 'px';
      div.style.top = ad.location.y + 'px';
      var img = document.createElement('img');
      img.className = 'rounded';
      img.width = 40;
      img.height = 40;
      img.src = ad.author.avatar;
      img.tabIndex = 0;
      div.appendChild(img);
      fragment.appendChild(div);
    },

    activatePin: function (pin) {
      pin.classList.add('pin--active');
    },

    deactivatePin: function (map) {
      var pinActive = map.querySelector('.pin--active');
      if (pinActive) {
        pinActive.classList.remove('pin--active');
      }
    }
  };
})();
