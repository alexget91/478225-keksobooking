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
  var noticeAvatar = document.querySelector('.notice__photo');
  var avatarDefault = noticeAvatar.querySelector('.notice__preview img').src;
  var photoContainer = document.querySelector('.form__photo-container');

  var formCheck = function (form) {
    var fields = form.querySelectorAll('input[type="text"], input[type="number"]');
    var formValid = true;

    [].forEach.call(fields, function (el) {
      if (el.checkValidity() === false) {
        el.style.borderColor = 'red';
        if (formValid) {
          formValid = false;
        }
      } else {
        el.style.borderColor = null;
      }
    });

    return formValid;
  };

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  // Синхронизация минимальной цены с типом жилья при перезагрузке формы
  var syncPriceDefault = function () {
    noticeFormPrice.min = window.data.OFFER_TYPES[noticeFormType.value].minPrice;
    noticeFormPrice.value = window.data.OFFER_TYPES[noticeFormType.value].minPrice;
  };

  var syncWithCustomValues = function (elToRead, elToWright, wrightValues) {
    var optionTags = elToRead.querySelectorAll('option');
    var readValues = [].map.call(optionTags, function (el) {
      return el.value;
    });
    window.synchronizeFields(elToRead, elToWright, readValues, wrightValues, syncValues);
  };

  var resetfileFields = function () {
    noticeAvatar.querySelector('input[type="file"]').value = '';
    noticeAvatar.querySelector('.notice__preview img').src = avatarDefault;
    photoContainer.querySelector('.drop-zone input[type="file"]').value = '';
    [].forEach.call(photoContainer.querySelectorAll('.form__photo.js-full'), function (el) {
      el.textContent = '';
      el.classList.remove('js-full');
    });
  };

  var onSaveSuccess = function () {
    noticeForm.reset();
    resetfileFields();
    syncPriceDefault();
  };


  syncPriceDefault();

  // Синхронизация полей времени заезда и выезда
  window.synchronizeFields(noticeFormTimein, noticeFormTimeout, window.data.CHECK_IN_TIMES, window.data.CHECK_OUT_TIMES, syncValues);
  window.synchronizeFields(noticeFormTimeout, noticeFormTimein, window.data.CHECK_OUT_TIMES, window.data.CHECK_IN_TIMES, syncValues);

  // Синхронизация типа жилья и минимальной цены
  var offerTypes = Object.keys(window.data.OFFER_TYPES);
  var offerMinPrices = [].map.call(offerTypes, function (el) {
    return window.data.OFFER_TYPES[el].minPrice;
  });
  window.synchronizeFields(noticeFormType, noticeFormPrice, offerTypes, offerMinPrices, syncValueWithMin);
  window.synchronizeFields(noticeFormType, noticeFormPrice, offerTypes, offerMinPrices, syncValues);

  // Синхронизация количества комнат с количеством мест
  syncWithCustomValues(noticeFormRooms, noticeFormCapacity, [1, null, null, 0]);

  // Синхронизация количества мест с количеством комнат
  syncWithCustomValues(noticeFormCapacity, noticeFormRooms, [3, 2, 1, 100]);


  // Блокировка отправки формы при наличии ошибок заполнения
  noticeFormSubmit.addEventListener('click', function (evt) {
    if (!formCheck(noticeForm)) {
      evt.preventDefault();
    }
  });

  // Отправка формы
  noticeForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(noticeForm), onSaveSuccess, window.backend.onLoadError);
    evt.preventDefault();
  });

})();
