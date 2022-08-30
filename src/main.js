import './style.css';
import createGame from './app';

let getShowsList;
document.getElementsByClassName('shows')[0].addEventListener('click', () => {
  for (let i = 1; i <= 250; i += 1) {
    getShowsList = createGame(i);
  }
  getShowsList.then((data) => {
    const sortObj = data.sort((a, b) => {
      const rest = b.rating.average - a.rating.average;
      return rest;
    });
    for (let i = 0; i < 6; i += 1) {
      const imageBestShows = sortObj[i].image.medium;
      const getParentNode = document.getElementById('content');
      const createDivImg = document.createElement('div');
      createDivImg.classList.add('line');
      createDivImg.style.backgroundImage = `url(${imageBestShows})`;
      getParentNode.appendChild(createDivImg);
      const createDiv = document.createElement('div');
      createDiv.classList.add('title');
    }
  });
});
