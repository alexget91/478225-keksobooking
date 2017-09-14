'use strict';

// Конструктор меток на карте
(function () {

  var pinId = 0;

  var Pin = function (data) {
    this.id = pinId++;
    this.author = data.author;
    this.offer = data.offer;
    this.location = data.location;
  };

  Pin.prototype = {
    imgWidth: 40,
    imgHeight: 40,

    buildElement: function () {
      var div = document.createElement('div');
      div.className = 'pin';
      div.dataset.id = this.id;
      div.style.left = this.location.x + 'px';
      div.style.top = this.location.y + 'px';
      var img = document.createElement('img');
      img.className = 'rounded';
      img.width = this.imgWidth;
      img.height = this.imgHeight;
      img.src = this.author.avatar;
      img.tabIndex = 0;
      div.appendChild(img);

      var pin = this;
      div.addEventListener('click', function (evt) {
        window.card.open(evt, pin);
      });
      div.addEventListener('keydown', function (evt) {
        window.util.isEnterEvent(evt, window.card.open, pin);
      });

      return div;
    }
  };

  window.Pin = Pin;

})();
