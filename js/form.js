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

  var changePriceToType = function (type) {
    noticeFormPrice.min = window.data.OFFER_TYPES[type].minPrice;
    noticeFormPrice.value = window.data.OFFER_TYPES[type].minPrice;
  };

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


  noticeForm.reset();
  changePriceToType(noticeFormType.value);

  noticeFormTimein.addEventListener('change', function (evt) {
    noticeFormTimeout.value = evt.target.value;
  });

  noticeFormTimeout.addEventListener('change', function (evt) {
    noticeFormTimein.value = evt.target.value;
  });

  noticeFormType.addEventListener('change', function (evt) {
    changePriceToType(evt.target.value);
  });

  noticeFormRooms.addEventListener('change', function (evt) {
    if (evt.target.value === '2' || evt.target.value === '100') {
      noticeFormCapacity.value = 3;
    } else if (evt.target.value === '1') {
      noticeFormCapacity.value = 0;
    }
  });

  noticeFormSubmit.addEventListener('click', function (evt) {
    if (!formCheck(noticeForm)) {
      evt.preventDefault();
    }
  });
})();
