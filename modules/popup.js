import { submitComments, catchComments } from './asyncApi.js';

let commentsCount = 0;

const popup = (id) => {
  let i = 0;
  const body = document.querySelector('body');
  const popup = document.createElement('div');
  const popupContent = document.createElement('div');
  const popupTitle = document.createElement('h2');
  const popupRating = document.createElement('div');
  const popupScore = document.createElement('h3');
  const popupImage = document.createElement('img');
  const popupDescription = document.createElement('p');
  const popupCategory = document.createElement('p');
  const popupCommmentUl = document.createElement('ul');
  const popupForm = document.createElement('form');
  const popupTitleForm = document.createElement('h2');
  const popupNameForm = document.createElement('input');
  const popupMessageForm = document.createElement('textarea');
  const popupSubmitForm = document.createElement('button');
  const popupCloseForm = document.createElement('button');
  const popupClose = document.createElement('button');

  popup.classList.add('popup');
  popupContent.classList.add('popup__content');
  popupTitle.classList.add('popup__title');
  popupRating.classList.add('popup__rating');
  popupScore.classList.add('popup__score');
  popupImage.classList.add('popup__image');
  popupDescription.classList.add('popup__description');
  popupCategory.classList.add('popup__category');
  popupCommmentUl.classList.add('popup__comment-ul');
  popupForm.classList.add('popup__form');
  popupTitleForm.classList.add('popup__title-form');
  popupNameForm.classList.add('popup__name-form');
  popupMessageForm.classList.add('popup__comment-form');
  popupSubmitForm.classList.add('popup__submit-form');
  popupCloseForm.classList.add('popup__close-form');
  popupClose.classList.add('popup__close');

  popupScore.setAttribute('id', 'popupScore');
  popupTitleForm.setAttribute('id', 'popupTitleForm');
  popupNameForm.setAttribute('name', 'name');
  popupNameForm.setAttribute('placeholder', 'Name');
  popupNameForm.setAttribute('type', 'text');
  popupNameForm.setAttribute('required', '');
  popupNameForm.setAttribute('maxlength', '20');
  popupMessageForm.setAttribute('name', 'message');
  popupMessageForm.setAttribute('placeholder', 'Comment');
  popupMessageForm.setAttribute('type', 'text');
  popupMessageForm.setAttribute('required', '');
  popupMessageForm.setAttribute('maxlength', '200');
  popupSubmitForm.setAttribute('type', 'submit');
  popupSubmitForm.setAttribute('value', 'Submit');
  popupCloseForm.setAttribute('type', 'button');
  popupCloseForm.setAttribute('value', 'Close');
  popupClose.setAttribute('type', 'button');
  popupClose.setAttribute('value', 'Close');
  popupClose.setAttribute('id', 'popupClose');
  body.appendChild(popup);
  popup.appendChild(popupContent);
  popupContent.appendChild(popupTitle);
  popupContent.appendChild(popupRating);
  popupContent.appendChild(popupScore);
  popupContent.appendChild(popupImage);
  popupContent.appendChild(popupDescription);
  popupContent.appendChild(popupCategory);
  popupContent.appendChild(popupCommmentUl);
  popupContent.appendChild(popupForm);
  popupForm.appendChild(popupTitleForm);
  popupForm.appendChild(popupNameForm);
  popupForm.appendChild(popupMessageForm);
  popupForm.appendChild(popupSubmitForm);
  popupForm.appendChild(popupCloseForm);
  popupForm.appendChild(popupClose);

  const popupInfo = async () => {
    const apiUrl = `https://api.tvmaze.com/shows/${id}`;
    const result = await fetch(apiUrl);
    const data = await result.json();

    document.querySelector('.popup__title').textContent = data.name;
    document.querySelector('.popup__score').textContent = data.rating.average;
    document.querySelector('.popup__image').src = data.image.original;
    document.querySelector('.popup__description').textContent = data.summary;
    document.querySelector('.popup__category').textContent = data.genres;
    document.querySelector('.popup__comment-ul').innerHTML = '';
    document.querySelector('.popup__title-form').textContent = 'Leave a comment';
    document.querySelector('.popup__name-form').value = '';
    document.querySelector('.popup__comment-form').value = '';
    document.querySelector('.popup__submit-form').value = 'Submit';
    document.querySelector('.popup__close-form').value = 'Close';
    document.querySelector('.popup__close').value = 'X';

    data.genres.forEach((genre) => {
      const genreLi = document.createElement('li');
      genreLi.classList.add('genre');
      genreLi.setAttribute('id', `genre${i}`);
      document.querySelector('.popup__category').appendChild(genreLi);
      document.getElementById(`genre${i}`).textContent = genre;
      i += 1;
    });
  };
  popupInfo();

  const updateComments = async (id) => {
    let comments = await catchComments(id);
    comments = Array.isArray(comments) ? comments : [];
    comments.forEach((comment) => {
      const commentLi = document.createElement('li');
      commentLi.classList.add('comment');
      commentLi.setAttribute('id', 'comment');
      document.querySelector('.popup__comment-ul').appendChild(commentLi);
      document.getElementById('comment').textContent = comment.message;
    });
    commentsCount = comments.length;
    document.querySelector('.popup__title').textContent = `Amount (${commentsCount})`;
  };
  updateComments(id);

  popupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submitComments(id, popupNameForm.value, popupMessageForm.value);
    popupCommmentUl.innerHTML = '';
    setTimeout(() => {
      updateComments(id);
    }, '1000');
    popupNameForm.value = '';
    popupMessageForm.value = '';
  });
  popupClose.addEventListener('click', (e) => {
    e.preventDefault();
    popup.remove();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === popup) {
      popup.remove();
    }
  });
};

export default popup;
