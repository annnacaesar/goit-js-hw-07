import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');
const cardsMarkup = createImageCardMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup);

function createImageCardMarkup(items) {
	return items.map(({ preview, original, description }) => {
		return `
		<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>
		`
	}).join('');

};

const onClickOpenModal = (evt) => {
  evt.preventDefault();
  const modalImg = evt.target.dataset.source;
  const modal = basicLightbox.create(
    `<img
     src='${modalImg}'
     data-source='${modalImg}'
     alt='${evt.target.alt}'
     class="gallery__image"
     width="800"
     height="600">`,

    {
      onShow: (modal) => {
        window.addEventListener("keydown", onEscapePress);
      },
      onClose: (modal) => {
        window.removeEventListener("keydown", onEscapePress);
      },
    }
  );

  const onEscapePress = (evt) => {
    if (evt.code === "Escape") {
      modal.close();
    }
  };

  modal.show();
};

galleryContainer.addEventListener('click', onClickOpenModal);