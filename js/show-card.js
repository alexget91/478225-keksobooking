'use strict';

// Показывает карточку выбранного жилья по нажатию на метку на карте
(function () {

  window.showCard = function (pin) {
    var dialogPanelTemplate = document.querySelector('#lodge-template');
    var dialogPanelContent = dialogPanelTemplate.content ? dialogPanelTemplate.content : dialogPanelTemplate;
    var dialogElement = dialogPanelContent.cloneNode(true);
    var dialogPopup = document.querySelector('#offer-dialog');
    var fragment = document.createDocumentFragment();

    dialogElement.querySelector('.lodge__title').textContent = pin.offer.title;
    dialogElement.querySelector('.lodge__address').textContent = pin.offer.address;
    dialogElement.querySelector('.lodge__price').innerHTML = pin.offer.price + '&#x20bd;/ночь';
    dialogElement.querySelector('.lodge__type').textContent = window.data.OFFER_TYPES[pin.offer.type].name;
    dialogElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + pin.offer.guests + ' гостей в ' + pin.offer.rooms + ' комнатах';
    dialogElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
    var feautersElement = dialogElement.querySelector('.lodge__features');
    for (var i = 0; i < pin.offer.features.length; i++) {
      feautersElement.innerHTML += '<span class="feature__image feature__image--' + pin.offer.features[i] + '"></span>';
    }
    dialogElement.querySelector('.lodge__description').textContent = pin.offer.description;

    fragment.appendChild(dialogElement);
    dialogPopup.replaceChild(fragment, dialogPopup.querySelector('.dialog__panel'));
    dialogPopup.querySelector('.dialog__title img').src = pin.author.avatar;
  };

})();
