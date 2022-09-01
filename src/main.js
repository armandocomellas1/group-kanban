import './style.css';
import { createAppShows, createAppEpisodes, createDOMListPeople } from './addlike';
import { createLike, createItem, getLikes } from './app';

let getShowsList;
let getEpisodeList;
let getPeopleList;

const createDOMList = (() => {
  for (let i = 1; i <= 100; i += 1) {
    getShowsList = createAppShows(i);
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
      const getParentNode = document.getElementById('show_cont');
      const countLikes = 0;
      // const createIDShow = `Api${(i + 1)}`;
      const createClassName = `count_likes${i + 1}`;
      const createTemplate = `
      <div class="line" style="background-image: url(${imageBestShows});"></div>
      <div class="title">${nameBestShows}</div>
      <div class="rating">Rating: ${ratingBestShows}</div>
      <div class="like_cont">
        <div class="${createClassName}">${countLikes} Likes</div>
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
      if (localStorage.length <= 0) {
        createLike().then((data) => {
          const selectId = data[0];
          const selectInd = data[1];
          let getElement = document.getElementsByClassName('like_cont')[selectInd];
          localStorage.setItem(selectInd, selectId);
          getElement = getElement.childNodes;
          const newElement = getElement[1];
          newElement.setAttribute('id', selectId);
        });
      }
    }
    if (localStorage.length > 0) {
      const sorted = Object.keys(localStorage).sort()
        .reduce((accumulator, key) => {
          accumulator[key] = localStorage[key];
          return accumulator;
        }, {});
      for (let i = 0; i < localStorage.length; i += 1) {
        const selectIdSort = sorted[i];
        const response = getLikes(selectIdSort);
        response.then((like) => {
          const getStatus = like;
          if (getStatus !== false && !getStatus.error) {
            const getLikes = like[0].likes;
            const getLikesId = like[0].item_id;
            const likeString = `${getLikes} Likes`;
            let getElement = document.getElementsByClassName('like_cont')[i];
            getElement = getElement.childNodes;
            const newElement = getElement[1];
            newElement.setAttribute('id', getLikesId);
            document.getElementById(getLikesId).innerHTML = likeString;
          }
        });
      }
    }
    const getParentCount = document.getElementById('show_cont').childElementCount;
    const showNumber = `Shows ${getParentCount}`;
    document.getElementsByClassName('shows')[0].innerText = showNumber;
  });
});

const createDOMListEpisode = (() => {
  for (let i = 1; i <= 100; i += 1) {
    getEpisodeList = createAppEpisodes(i);
  }
  getEpisodeList.then((data) => {
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
      const getParentNode = document.getElementById('episode_cont');
      const countLikes = 0;
      // const createIDShow = `Api${(i + 1)}`;
      const createClassName = `count_likes${i + 1}`;
      const createTemplate = `
      <div class="line" style="background-image: url(${imageBestShows});"></div>
      <div class="title">${nameBestShows}</div>
      <div class="rating">Rating: ${ratingBestShows}</div>
      <div class="like_cont">
        <div class="${createClassName}">${countLikes} Likes</div>
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
      if (localStorage.length <= 0) {
        createLike().then((data) => {
          const selectId = data[0];
          const selectInd = data[1];
          let getElement = document.getElementsByClassName('like_cont')[selectInd];
          localStorage.setItem(selectInd, selectId);
          getElement = getElement.childNodes;
          const newElement = getElement[1];
          newElement.setAttribute('id', selectId);
        });
      }
    }
    if (localStorage.length > 0) {
      const sorted = Object.keys(localStorage).sort()
        .reduce((accumulator, key) => {
          accumulator[key] = localStorage[key];
          return accumulator;
        }, {});
      for (let i = 0; i < localStorage.length; i += 1) {
        const selectIdSort = sorted[i];
        const response = getLikes(selectIdSort);
        response.then((like) => {
          const getStatus = like;
          if (getStatus !== false && !getStatus.error) {
            const getLikes = like[0].likes;
            const getLikesId = like[0].item_id;
            const likeString = `${getLikes} Likes`;
            let getElement = document.getElementsByClassName('like_cont')[i];
            getElement = getElement.childNodes;
            const newElement = getElement[1];
            newElement.setAttribute('id', getLikesId);
            document.getElementById(getLikesId).innerHTML = likeString;
          }
        });
      }
    }
    const getParentCount = document.getElementById('episode_cont').childElementCount;
    const showNumber = `Episodes ${getParentCount}`;
    document.getElementsByClassName('episodes')[0].innerText = showNumber;
  });
});

const createDOMListPeoples = (() => {
  for (let i = 1; i <= 100; i += 1) {
    getPeopleList = createDOMListPeople(i);
  }
  getPeopleList.then((data) => {
    const sortObj = data.filter((text) => {
      const rest = text.image !== undefined;
      return rest;
    });
    for (let i = 0; i < 6; i += 1) {
      const imageBestShows = sortObj[i].image.medium;
      const nameBestShows = sortObj[i].name;
      // const ratingBestShows = sortObj[i].birthday;
      const craeteComment = 'Comments';
      const craeteReserv = 'Reservations';
      const getParentNode = document.getElementById('people_cont');
      const countLikes = 0;
      // const createIDShow = `Api${(i + 1)}`;
      const createClassName = `count_likes${i + 1}`;
      const createTemplate = `
      <div class="line" style="background-image: url(${imageBestShows});"></div>
      <div class="title">${nameBestShows}</div>
      <div class="rating"></div>
      <div class="like_cont">
        <div class="${createClassName}">${countLikes} Likes</div>
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
      if (localStorage.length <= 0) {
        createLike().then((data) => {
          const selectId = data[0];
          const selectInd = data[1];
          let getElement = document.getElementsByClassName('like_cont')[selectInd];
          localStorage.setItem(selectInd, selectId);
          getElement = getElement.childNodes;
          const newElement = getElement[1];
          newElement.setAttribute('id', selectId);
        });
      }
    }
    if (localStorage.length > 0) {
      const sorted = Object.keys(localStorage).sort()
        .reduce((accumulator, key) => {
          accumulator[key] = localStorage[key];
          return accumulator;
        }, {});
      for (let i = 0; i < localStorage.length; i += 1) {
        const selectIdSort = sorted[i];
        const response = getLikes(selectIdSort);
        response.then((like) => {
          const getStatus = like;
          if (getStatus !== false && !getStatus.error) {
            const getLikes = like[0].likes;
            const getLikesId = like[0].item_id;
            const likeString = `${getLikes} Likes`;
            let getElement = document.getElementsByClassName('like_cont')[i];
            getElement = getElement.childNodes;
            const newElement = getElement[1];
            newElement.setAttribute('id', getLikesId);
            document.getElementById(getLikesId).innerHTML = likeString;
          }
        });
      }
    }
    const getParentCount = document.getElementById('people_cont').childElementCount;
    const showNumber = `People ${getParentCount}`;
    document.getElementsByClassName('people')[0].innerText = showNumber;
  });
});

document.getElementsByClassName('shows')[0].addEventListener('click', () => {
  if (localStorage.length === 0) {
    document.getElementById('show_cont').style.display = 'grid';
    document.getElementById('episode_cont').style.display = 'none';
    document.getElementById('people_cont').style.display = 'none';
    document.getElementsByClassName('shows')[0].style.textDecoration = 'underline';
    document.getElementsByClassName('shows')[0].style.fontWeight = 'bold';
    createDOMList();
  } else if (localStorage.length > 0) {
    document.getElementById('show_cont').style.display = 'grid';
    document.getElementById('episode_cont').style.display = 'none';
    document.getElementById('people_cont').style.display = 'none';
    document.getElementsByClassName('shows')[0].style.textDecoration = 'underline';
    document.getElementsByClassName('shows')[0].style.fontWeight = 'bold';
    document.getElementsByClassName('episodes')[0].style.textDecoration = 'none';
    document.getElementsByClassName('episodes')[0].style.fontWeight = 'normal';
    document.getElementsByClassName('people')[0].style.textDecoration = 'none';
    document.getElementsByClassName('people')[0].style.fontWeight = 'normal';
    document.getElementsByClassName('episodes')[0].innerText = 'Episodes';
    document.getElementsByClassName('people')[0].innerText = 'People';
    createDOMListEpisode();
  }
});

document.getElementsByClassName('episodes')[0].addEventListener('click', () => {
  if (localStorage.length === 0) {
    document.getElementById('show_cont').style.display = 'none';
    document.getElementById('episode_cont').style.display = 'grid';
    document.getElementById('people_cont').style.display = 'none';
    document.getElementsByClassName('episodes')[0].style.textDecoration = 'underline';
    document.getElementsByClassName('episodes')[0].style.fontWeight = 'bold';
    createDOMListEpisode();
  } else if (localStorage.length > 0) {
    document.getElementById('show_cont').style.display = 'none';
    document.getElementById('episode_cont').style.display = 'grid';
    document.getElementById('people_cont').style.display = 'none';
    document.getElementsByClassName('shows')[0].style.textDecoration = 'none';
    document.getElementsByClassName('shows')[0].style.fontWeight = 'normal';
    document.getElementsByClassName('episodes')[0].style.textDecoration = 'underline';
    document.getElementsByClassName('episodes')[0].style.fontWeight = 'bold';
    document.getElementsByClassName('people')[0].style.textDecoration = 'none';
    document.getElementsByClassName('people')[0].style.fontWeight = 'normal';
    document.getElementsByClassName('shows')[0].innerText = 'Shows';
    document.getElementsByClassName('people')[0].innerText = 'People';
    createDOMListEpisode();
  }
});

document.getElementsByClassName('people')[0].addEventListener('click', () => {
  if (localStorage.length === 0) {
    document.getElementById('show_cont').style.display = 'none';
    document.getElementById('episode_cont').style.display = 'none';
    document.getElementById('people_cont').style.display = 'grid';
    document.getElementsByClassName('people')[0].style.textDecoration = 'underline';
    document.getElementsByClassName('people')[0].style.fontWeight = 'bold';
    createDOMListPeoples();
  } else if (localStorage.length > 0) {
    document.getElementById('show_cont').style.display = 'none';
    document.getElementById('episode_cont').style.display = 'none';
    document.getElementById('people_cont').style.display = 'grid';
    document.getElementsByClassName('shows')[0].style.textDecoration = 'none';
    document.getElementsByClassName('shows')[0].style.fontWeight = 'normal';
    document.getElementsByClassName('episodes')[0].style.textDecoration = 'none';
    document.getElementsByClassName('episodes')[0].style.fontWeight = 'normal';
    document.getElementsByClassName('people')[0].style.textDecoration = 'underline';
    document.getElementsByClassName('people')[0].style.fontWeight = 'bold';
    document.getElementsByClassName('shows')[0].innerText = 'Shows';
    document.getElementsByClassName('episodes')[0].innerText = 'Episodes';
    createDOMListPeoples();
  }
});

document.addEventListener('click', (event) => {
  const getEventType = event.target.className;
  if (localStorage.length > 0 && getEventType === 'material-symbols-outlined') {
    const showListId = event.path[1].firstElementChild.id;
    createItem(showListId, event);
  }
});

window.addEventListener('load', () => {
  if (localStorage.length > 0) {
    const queryString = window.location.hash;
    const splitQuery = queryString.split('#')[1];
    switch (splitQuery) {
      case 'shows':
        document.getElementById('show_cont').style.display = 'grid';
        document.getElementById('episode_cont').style.display = 'none';
        document.getElementById('people_cont').style.display = 'none';
        document.getElementsByClassName('shows')[0].style.textDecoration = 'underline';
        document.getElementsByClassName('shows')[0].style.fontWeight = 'bold';
        createDOMList();
        break;
      case 'episodes':
        document.getElementById('show_cont').style.display = 'none';
        document.getElementById('episode_cont').style.display = 'grid';
        document.getElementById('people_cont').style.display = 'none';
        document.getElementsByClassName('episodes')[0].style.textDecoration = 'underline';
        document.getElementsByClassName('episodes')[0].style.fontWeight = 'bold';
        createDOMListEpisode();
        break;
      default:
        document.getElementById('show_cont').style.display = 'none';
        document.getElementById('episode_cont').style.display = 'none';
        document.getElementById('people_cont').style.display = 'grid';
        document.getElementsByClassName('people')[0].style.textDecoration = 'underline';
        document.getElementsByClassName('people')[0].style.fontWeight = 'bold';
        createDOMListPeoples();
        break;
    }
  } else if (localStorage.length <= 0) {
    document.getElementById('show_cont').style.display = 'none';
    document.getElementById('episode_cont').style.display = 'none';
    document.getElementById('people_cont').style.display = 'none';
  }
});
