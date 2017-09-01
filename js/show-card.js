'use strict';

// Показывает карточку выбранного жилья по нажатию на метку на карте
(function () {

  window.showCard = function (id) {
    var dialogPanelTemplate = document.querySelector('#lodge-template');
    var dialogPanelContent = dialogPanelTemplate.content ? dialogPanelTemplate.content : dialogPanelTemplate;
    var dialogElement = dialogPanelContent.cloneNode(true);
    var dialogPopup = document.querySelector('#offer-dialog');
    var fragment = document.createDocumentFragment();
    var ad = window.map.similarAds[id];

    dialogElement.querySelector('.lodge__title').textContent = ad.offer.title;
    dialogElement.querySelector('.lodge__address').textContent = ad.offer.address;
    dialogElement.querySelector('.lodge__price').innerHTML = ad.offer.price + '&#x20bd;/ночь';
    dialogElement.querySelector('.lodge__type').textContent = window.data.OFFER_TYPES[ad.offer.type].name;
    dialogElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + ad.offer.guests + ' гостей в ' + ad.offer.rooms + ' комнатах';
    dialogElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    var feautersElement = dialogElement.querySelector('.lodge__features');
    for (var i = 0; i < ad.offer.features.length; i++) {
      feautersElement.innerHTML += '<span class="feature__image feature__image--' + ad.offer.features[i] + '"></span>';
    }
    dialogElement.querySelector('.lodge__description').textContent = ad.offer.description;

    fragment.appendChild(dialogElement);
    dialogPopup.replaceChild(fragment, dialogPopup.querySelector('.dialog__panel'));
    dialogPopup.querySelector('.dialog__title img').src = ad.author.avatar;
  };

})();
