'use strict';

// Загрузка изображений
(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.notice__photo .drop-zone input[type="file"]');
  var avatarPreview = document.querySelector('.notice__preview img');
  var photoContainer = document.querySelector('.form__photo-container');
  var photoChooser = photoContainer.querySelector('.drop-zone input[type="file"]');
  var dragCells;
  var draggedItem = null;

  var setSrc = function (img, url) {
    img.src = url;
  };

  var createImg = function (preview, url) {
    var el = preview.querySelector('.form__photo:not(.js-full)');
    if (el !== null) {
      var fragment = document.createDocumentFragment();
      var img = document.createElement('img');
      img.src = url;
      img.draggable = 'true';
      img.style.width = '100%';
      img.style.height = '100%';
      fragment.appendChild(img);
      el.classList.add('js-full');
      el.appendChild(fragment);
      dragCells = photoContainer.querySelectorAll('.js-full');
    }
  };

  var onChangeListener = function (evt, preview, onLoad) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      var onImgLoad = function () {
        onLoad(preview, reader.result);
      };

      reader.addEventListener('load', onImgLoad);
      reader.readAsDataURL(file);
    }
  };

  var onAvatarChange = function (evt) {
    onChangeListener(evt, avatarPreview, setSrc);
  };

  var onPhotoChange = function (evt) {
    onChangeListener(evt, photoContainer, createImg);
  };

  avatarChooser.addEventListener('change', onAvatarChange);
  photoChooser.addEventListener('change', onPhotoChange);


  // Перетаскивание загруженных картинок

  var showDragCells = function () {
    dragCells.forEach(function (cell) {
      cell.style.outline = '2px dashed #7D7D77';
    });
  };

  var hideDragCells = function () {
    dragCells.forEach(function (cell) {
      cell.style.outline = '';
    });
  };

  var showDragTarget = function (cell) {
    cell.style.opacity = 0.5;
  };

  var hideDragTarget = function (cell) {
    cell.style.opacity = '';
  };

  var checkDragCell = function (evt, action) {
    var cell;
    if (evt.target.tagName === 'IMG') {
      cell = evt.target.parentElement;
    } else if (evt.target.classList.contains('form__photo')) {
      cell = evt.target;
    }
    if ((typeof cell !== 'undefined') && cell.children.length) {
      action(cell);
    }
  };

  var swapImages = function (cell) {
    var img = cell.querySelector('img');
    draggedItem.parentElement.appendChild(img);
    cell.appendChild(draggedItem);
  };


  photoContainer.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      showDragCells();
    }
  });

  photoContainer.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  photoContainer.addEventListener('drop', function (evt) {
    checkDragCell(evt, function (cell) {
      swapImages(cell);
      hideDragTarget(cell);
    });
    evt.preventDefault();
  });

  photoContainer.addEventListener('dragenter', function (evt) {
    checkDragCell(evt, function (cell) {
      showDragTarget(cell);
    });
    evt.preventDefault();
  });

  photoContainer.addEventListener('dragleave', function (evt) {
    checkDragCell(evt, function (cell) {
      hideDragTarget(cell);
    });
    evt.preventDefault();
  });

  photoContainer.addEventListener('dragend', hideDragCells);

})();
