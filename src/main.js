import './style.css';
import { createAppShows, createAppEpisodes, createDOMListPeople } from './addlike';
import {
  createLike,
  createItem,
  getLikes,
  showsLocalStorage,
} from './app';
import popup from './modules/popup';

let getShowsList;
let getEpisodeList;
let getPeopleList;
let checkEpisode = true;
let checkPeople = true;
const localStorageStatic = showsLocalStorage;

const createDOMList = ((event) => {
  if (event === 'first' || event === 'load') {
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
        globalArray.push(sortObj[i]);
        const createParentEl = document.createElement('div');
        createParentEl.classList.add('show');
        createParentEl.innerHTML = createTemplate;
        getParentNode.appendChild(createParentEl);
        if (localStorageStatic.length <= 0) {
          createLike().then((data) => {
            const selectId = data[0];
            const selectInd = data[1];
            let getElement = document.getElementsByClassName('like_cont')[selectInd];
            localStorageStatic.setItem(selectInd, selectId);
            getElement = getElement.childNodes;
            const newElement = getElement[1];
            newElement.setAttribute('id', selectId);
          });
        }
      }
      if (localStorageStatic.length > 0) {
        const sorted = Object.keys(localStorageStatic).sort()
          .reduce((accumulator, key) => {
            accumulator[key] = localStorageStatic[key];
            return accumulator;
          }, {});
        for (let i = 0; i < localStorageStatic.length; i += 1) {
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
            } else if (getStatus === false) {
              let getElement = document.getElementsByClassName('like_cont')[i];
              getElement = getElement.childNodes;
              const newElement = getElement[1];
              newElement.setAttribute('id', selectIdSort);
            }
          });
        }
      }
      const getParentCount = document.getElementById('show_cont').childElementCount;
      const showNumber = `Shows ${getParentCount}`;
      document.getElementsByClassName('shows')[0].innerText = showNumber;
    });
  }
});

const createDOMListEpisode = ((event) => {
  if ((event === 'second' || event === 'load') && checkEpisode === true) {
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
        if (localStorageStatic.length <= 0) {
          createLike().then((data) => {
            const selectId = data[0];
            const selectInd = data[1];
            let getElement = document.getElementsByClassName('like_cont')[selectInd];
            localStorageStatic.setItem(selectInd, selectId);
            getElement = getElement.childNodes;
            const newElement = getElement[1];
            newElement.setAttribute('id', selectId);
          });
        }
      }
      if (localStorageStatic.length > 0 && event === 'first') {
        const sorted = Object.keys(localStorageStatic).sort()
          .reduce((accumulator, key) => {
            accumulator[key] = localStorageStatic[key];
            return accumulator;
          }, {});
        for (let i = 0; i < localStorageStatic.length; i += 1) {
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
      checkEpisode = false;
    });
  }
});

const createDOMListPeoples = ((event) => {
  if ((event === 'second' || event === 'load') && checkPeople === true) {
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
        if (localStorageStatic.length <= 0) {
          createLike().then((data) => {
            const selectId = data[0];
            const selectInd = data[1];
            let getElement = document.getElementsByClassName('like_cont')[selectInd];
            localStorageStatic.setItem(selectInd, selectId);
            getElement = getElement.childNodes;
            const newElement = getElement[1];
            newElement.setAttribute('id', selectId);
          });
        }
      }
      if (localStorageStatic.length > 0 && event === 'first') {
        const sorted = Object.keys(localStorageStatic).sort()
          .reduce((accumulator, key) => {
            accumulator[key] = localStorageStatic[key];
            return accumulator;
          }, {});
        for (let i = 0; i < localStorageStatic.length; i += 1) {
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
      checkPeople = false;
    });
  }
});

document.getElementsByClassName('shows')[0].addEventListener('click', () => {
  if (localStorageStatic.length === 0) {
    document.getElementById('show_cont').style.display = 'grid';
    document.getElementById('episode_cont').style.display = 'none';
    document.getElementById('people_cont').style.display = 'none';
    document.getElementsByClassName('shows')[0].style.textDecoration = 'underline';
    document.getElementsByClassName('shows')[0].style.fontWeight = 'bold';
    createDOMList('first');
  } else if (localStorageStatic.length > 0) {
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
    createDOMList('second');
  }
});

document.getElementsByClassName('episodes')[0].addEventListener('click', () => {
  if (localStorageStatic.length === 0) {
    document.getElementById('show_cont').style.display = 'none';
    document.getElementById('episode_cont').style.display = 'grid';
    document.getElementById('people_cont').style.display = 'none';
    document.getElementsByClassName('episodes')[0].style.textDecoration = 'underline';
    document.getElementsByClassName('episodes')[0].style.fontWeight = 'bold';
    createDOMListEpisode('first');
  } else if (localStorageStatic.length > 0) {
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
    createDOMListEpisode('second');
  }
});

document.getElementsByClassName('people')[0].addEventListener('click', () => {
  if (localStorageStatic.length === 0) {
    document.getElementById('show_cont').style.display = 'none';
    document.getElementById('episode_cont').style.display = 'none';
    document.getElementById('people_cont').style.display = 'grid';
    document.getElementsByClassName('people')[0].style.textDecoration = 'underline';
    document.getElementsByClassName('people')[0].style.fontWeight = 'bold';
    createDOMListPeoples('first');
  } else if (localStorageStatic.length > 0) {
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
    createDOMListPeoples('second');
  }
});

document.addEventListener('click', (event) => {
  const getEventType = event.target.className;
  if (localStorageStatic.length > 0 && getEventType === 'material-symbols-outlined') {
    const showListId = event.path[1].firstElementChild.id;
    createItem(showListId, event);
  }
});

document.addEventListener('click', (event) => {
  const getEventType = event.target.className;
  if (localStorageStatic.length > 0 && getEventType === 'comments') {
    const showListId = event.path[1].childNodes[3].innerText;
    globalArray.forEach((data) => {
      if (data.name === showListId) {
        const getId = data.id;
        document.getElementsByClassName('container')[0].style.display = 'none';
        popup(getId);
      }
    });
  }
});

window.addEventListener('load', () => {
  if (localStorageStatic.length > 0) {
    const queryString = window.location.hash;
    const splitQuery = queryString.split('#')[1];
    switch (splitQuery) {
      case 'shows':
        document.getElementById('show_cont').style.display = 'grid';
        document.getElementById('episode_cont').style.display = 'none';
        document.getElementById('people_cont').style.display = 'none';
        document.getElementsByClassName('shows')[0].style.textDecoration = 'underline';
        document.getElementsByClassName('shows')[0].style.fontWeight = 'bold';
        createDOMList('load');
        break;
      case 'episodes':
        document.getElementById('show_cont').style.display = 'none';
        document.getElementById('episode_cont').style.display = 'grid';
        document.getElementById('people_cont').style.display = 'none';
        document.getElementsByClassName('episodes')[0].style.textDecoration = 'underline';
        document.getElementsByClassName('episodes')[0].style.fontWeight = 'bold';
        createDOMListEpisode('load');
        break;
      default:
        document.getElementById('show_cont').style.display = 'none';
        document.getElementById('episode_cont').style.display = 'none';
        document.getElementById('people_cont').style.display = 'grid';
        document.getElementsByClassName('people')[0].style.textDecoration = 'underline';
        document.getElementsByClassName('people')[0].style.fontWeight = 'bold';
        createDOMListPeoples('load');
        break;
    }
  } else if (localStorageStatic.length <= 0) {
    document.getElementById('show_cont').style.display = 'none';
    document.getElementById('episode_cont').style.display = 'none';
    document.getElementById('people_cont').style.display = 'none';
  }
});
