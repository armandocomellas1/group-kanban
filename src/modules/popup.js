import { catchComments, createComments, getComments } from './asyncApi';

let countTwo = 0;

const popup = (id) => {
  const getLocalString = localStorage.getItem(`getID${countTwo}`);
  console.log('getLocalString', getLocalString);
  if (getLocalString !== null) {
    const updateComments = async (getLocalString) => {
      const getCommentsObj = await getComments(getLocalString);
      console.log('getCommentsObj', getCommentsObj);
      const commentLi = document.createElement('li');
      commentLi.classList.add('comment');
      commentLi.setAttribute('id', `comment${countTwo}`);
      document.querySelector('.popup__comment-ul').appendChild(commentLi);
      console.log('count', countTwo);
      document.getElementById(`comment${countTwo}`).innerHTML = `${getCommentsObj[0].username} - ${getCommentsObj[0].creation_date} - ${getCommentsObj[0].comment}`;
      document.querySelector('.popup__subtitle').textContent = `There are ${countTwo + 1} comments`;
      countTwo += 1;
    };
    updateComments(getLocalString);
  }

  let i = 0;
  const body = document.querySelector('body');
  const popup = document.createElement('div');
  const popupContent = document.createElement('div');
  const popupTitle = document.createElement('h2');
  const popupRating = document.createElement('div');
  const popupScore = document.createElement('h3');
  const popupImage = document.createElement('img');
  const popupDescription = document.createElement('p');
  const popupSubTitle = document.createElement('h3');
  const popupCategory = document.createElement('p');
  const popupCommmentUl = document.createElement('ul');
  const popupForm = document.createElement('form');
  const popupTitleForm = document.createElement('h2');
  const popupNameForm = document.createElement('input');
  const popupMessageForm = document.createElement('textarea');
  const popupSubmitForm = document.createElement('button');
  const popupClose = document.createElement('div');

  popup.classList.add('popup');
  popupContent.classList.add('popup__content');
  popupTitle.classList.add('popup__title');
  popupRating.classList.add('popup__rating');
  popupScore.classList.add('popup__score');
  popupClose.classList.add('popup__close');
  popupImage.classList.add('popup__image');
  popupDescription.classList.add('popup__description');
  popupCategory.classList.add('popup__category');
  popupSubTitle.classList.add('popup__subtitle');
  popupCommmentUl.classList.add('popup__comment-ul');
  popupForm.classList.add('popup__form');
  popupTitleForm.classList.add('popup__title-form');
  popupNameForm.classList.add('popup__name-form');
  popupMessageForm.classList.add('popup__comment-form');
  popupSubmitForm.classList.add('popup__submit-form');

  popupScore.setAttribute('id', 'popupScore');
  popupSubTitle.setAttribute('id', 'popupSubTitle');
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
  popupMessageForm.setAttribute('maxlength', '500');
  popupSubmitForm.setAttribute('type', 'submit');
  popupClose.setAttribute('type', 'button');
  popupClose.setAttribute('id', 'popupClose');
  body.appendChild(popup);
  popup.appendChild(popupContent);
  popupContent.appendChild(popupTitle);
  popupContent.appendChild(popupRating);
  popupContent.appendChild(popupScore);
  popupContent.appendChild(popupClose);
  popupContent.appendChild(popupImage);
  popupContent.appendChild(popupDescription);
  popupContent.appendChild(popupCategory);
  popupContent.appendChild(popupSubTitle);
  popupContent.appendChild(popupCommmentUl);
  popupContent.appendChild(popupForm);
  popupForm.appendChild(popupTitleForm);
  popupForm.appendChild(popupNameForm);
  popupForm.appendChild(popupMessageForm);
  popupForm.appendChild(popupSubmitForm);

  const popupInfo = async () => {
    const apiUrl = `https://api.tvmaze.com/shows/${id}`;
    const result = await fetch(apiUrl);
    const data = await result.json();

    document.querySelector('.popup__title').innerHTML = data.name;
    document.querySelector('.popup__score').textContent = `Rating: ${data.rating.average}`;
    document.querySelector('.popup__close').textContent = 'X';
    document.querySelector('.popup__image').src = data.image.original;
    document.querySelector('.popup__description').innerHTML = data.summary;
    document.querySelector('#popupSubTitle').textContent = 'Comments';
    document.querySelector('.popup__comment-ul').innerHTML = '';
    document.querySelector('.popup__title-form').textContent = 'Leave a comment';
    document.querySelector('.popup__name-form').value = '';
    document.querySelector('.popup__comment-form').value = '';
    document.querySelector('.popup__submit-form').textContent = 'Submit';

    data.genres.forEach((genre) => {
      const genreLi = document.createElement('li');
      genreLi.classList.add('genre');
      genreLi.setAttribute('id', `genre${i}`);
      document.querySelector('.popup__category').appendChild(genreLi);
      document.getElementById(`genre${i}`).innerHTML = `${genre}`;
      i += 1;
    });
  };
  popupInfo();

  let count = 0;
  const updateComments = async (id, name, message) => {
    const getListDOM = document.getElementById('popupSubTitle').childElementCount;
    const createId = await catchComments(id, name, message, count);
    const comments = await createComments(createId, name, message);
    const getCommentsObj = await getComments(createId, name, message);
    const getDataStrcut = getCommentsObj[0];
    const getName = getDataStrcut.username;
    const getDate = getDataStrcut.creation_date;
    const getComment = getDataStrcut.comment;
    console.log('getDataStrcut', getDataStrcut);

    if (getDataStrcut) {
      const commentLi = document.createElement('li');
      commentLi.classList.add('comment');
      commentLi.setAttribute('id', `comment${count}`);
      document.querySelector('.popup__comment-ul').appendChild(commentLi);
      console.log('count', count);
      document.getElementById(`comment${count}`).innerHTML = `${getDate} - ${getName} - ${getComment}`;
      document.querySelector('.popup__subtitle').textContent = `There are ${count + 1} comments`;
      count += 1;
    } else {
      document.querySelector('.popup__subtitle').textContent = `There are ${0} comments`;
    }
  };

  // updateComments(id);

  popupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // const store = [];
    // store.push(document.getElementsByClassName('popup__name-form')[0].value);
    // store.push(document.getElementsByClassName('popup__comment-form')[0].value);
    updateComments(id, popupNameForm.value, popupMessageForm.value);
    popupNameForm.value = '';
    popupMessageForm.value = '';
  });

  popupClose.addEventListener('click', (e) => {
    e.preventDefault();
    popup.remove();
    document.getElementsByClassName('container')[0].style.display = 'grid';
  });

  window.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.remove();
    }
  });
};

window.addEventListener('load', () => {

});

export default popup;
