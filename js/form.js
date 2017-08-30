'use strict';

// Модуль для работы с формой объявления
(function () {

  var noticeForm = document.querySelector('.notice__form');
  var noticeFormTimein = noticeForm.querySelector('#timein');
  var noticeFormTimeout = noticeForm.querySelector('#timeout');
  var noticeFormType = noticeForm.querySelector('#type');
  var noticeFormPrice = noticeForm.querySelector('#price');
  var noticeFormRooms = noticeForm.querySelector('#room_number');
  var noticeFormCapacity = noticeForm.querySelector('#capacity');
  var noticeFormSubmit = noticeForm.querySelector('.notice__form .form__submit');

  var formCheck = function (form) {
    var fields = form.querySelectorAll('input[type="text"], input[type="number"]');
    var formValid = true;

    for (var i = 0; i < fields.length; i++) {
      if (fields[i].checkValidity() === false) {
        fields[i].style.borderColor = 'red';
        if (formValid) {
          formValid = false;
        }
      } else {
        fields[i].style.borderColor = null;
      }
    }

    return formValid;
  };

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };


  noticeForm.reset();
  noticeFormPrice.min = window.data.OFFER_TYPES[noticeFormType.value].minPrice;
  noticeFormPrice.value = window.data.OFFER_TYPES[noticeFormType.value].minPrice;

  // Синхронизация полей времени заезда и выезда
  window.synchronizeFields(noticeFormTimein, noticeFormTimeout, window.data.CHECK_IN_TIMES, window.data.CHECK_OUT_TIMES, syncValues);
  window.synchronizeFields(noticeFormTimeout, noticeFormTimein, window.data.CHECK_OUT_TIMES, window.data.CHECK_IN_TIMES, syncValues);

  // Синхронизация типа жилья и минимальной цены
  var offerTypes = Object.keys(window.data.OFFER_TYPES);
  var offerMinPrices = [];
  for (var i = 0; i < offerTypes.length; i++) {
    offerMinPrices[i] = window.data.OFFER_TYPES[offerTypes[i]].minPrice;
  }
  window.synchronizeFields(noticeFormType, noticeFormPrice, offerTypes, offerMinPrices, syncValueWithMin);
  window.synchronizeFields(noticeFormType, noticeFormPrice, offerTypes, offerMinPrices, syncValues);

  // Синхронизация количества комнат и количества мест
  var offerRooms = [];
  var roomOptionTags = noticeFormRooms.querySelectorAll('option');
  for (i = 0; i < roomOptionTags.length; i++) {
    offerRooms[i] = roomOptionTags[i].value;
  }
  var offerCapacity = [0, 3, null, 3];
  window.synchronizeFields(noticeFormRooms, noticeFormCapacity, offerRooms, offerCapacity, syncValues);


  // Блокировка отправки формы при наличии ошибок заполнения
  noticeFormSubmit.addEventListener('click', function (evt) {
    if (!formCheck(noticeForm)) {
      evt.preventDefault();
    }
  });

})();
