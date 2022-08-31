import './style.css';
import createApp from './addlike';
import { createLike, createItem, getLikes } from './app';

let getShowsList;
document.getElementsByClassName('shows')[0].addEventListener('click', () => {
  const getLocalStorageCount = localStorage.length;
  if (getLocalStorageCount === 0) {
    for (let i = 1; i <= 250; i += 1) {
      getShowsList = createApp(i);
    }
    getShowsList.then((data) => {
      const sortObj = data.sort((a, b) => {
        const rest = b.rating.average - a.rating.average;
        return rest;
      });
      for (let i = 0; i < 6; i += 1) {
        const imageBestShows = sortObj[i].image.medium;
        const nameBestShows = sortObj[i].name;
        const ratingBestShows = sortObj[i].rating.average;
        const craeteComment = 'Comments';
        const craeteReserv = 'Reservations';
        const getParentNode = document.getElementById('content');
        const countLikes = 0;
        const createIDShow = `Api${(i + 1)}`;
        createLike(createIDShow).then((ID) => {
          const createTemplate = `
            <div class="line" style="background-image: url(${imageBestShows});"></div>
            <div class="title">${nameBestShows}</div>
            <div class="rating">Rating: ${ratingBestShows}</div>
            <div class="like_cont">
              <div id=${ID} class="count_likes${i + 1}">${countLikes} Likes</div>
              <div class="material-symbols-outlined">
                favorite
              </div>
            </div>
            <button class="comments">${craeteComment}</button>
            <button class="reserves">${craeteReserv}</button>
          `;
          const createParentEl = document.createElement('div');
          createParentEl.classList.add('show');
          createParentEl.innerHTML = createTemplate;
          getParentNode.appendChild(createParentEl);
        });
      }
    });
  }
});

document.addEventListener('click', (event) => {
  const getEventType = event.target.className;
  const getLocalStorage = localStorage.length;
  const getDOMId = event.target.parentElement.firstElementChild.id;
  if (getLocalStorage > 0 && getEventType === 'material-symbols-outlined') {
    createItem(getDOMId, event);
  }
});
