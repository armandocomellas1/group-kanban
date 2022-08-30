const storeShows = [];
const createGame = async (i) => {
  const loopShows = `https://api.tvmaze.com/shows/${i}`;
  const response = await fetch(loopShows, {
    method: 'GET',
  });
  const data = await response.json();
  if (data.status !== 404) {
    storeShows.push(data);
  }
  return storeShows;
};

export default createGame;