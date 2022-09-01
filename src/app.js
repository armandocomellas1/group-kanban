let count = -1;
const createLike = async () => {
  const involvmentApi = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
  const response = await fetch(involvmentApi, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (response.status === 201) {
    count += 1;
    const data = await response.text();
    return [data, count];
  }
  return false;
};

const createLikeEpisode = async (createIDShow) => {
  const involvmentApi = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
  const response = await fetch(involvmentApi, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const data = await response.text();
  localStorage.setItem(createIDShow, data);
  return data;
};

const createItem = async (ID, event) => {
  const involvmentApi = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${ID}/likes/`;
  const responseGet = await fetch(involvmentApi, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const dataGet = await responseGet.text();
  const responsePost = await fetch(involvmentApi, {
    method: 'POST',
    body: JSON.stringify({
      item_id: ID,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const dataPost = await responsePost.text();
  let getItemsNum = 1;
  if (dataPost === 'Created') {
    const getParents = event.path[1].firstElementChild.id;
    if (dataGet !== '') {
      getItemsNum = JSON.parse(dataGet)[0].likes;
      getItemsNum = Number(getItemsNum) + 1;
    }
    const sumLikes = getItemsNum;
    const concaString = `${sumLikes} Likes`;
    document.getElementById(getParents).innerHTML = concaString;
  }
  return getItemsNum;
};

const getLikes = async (ID) => {
  const involvmentApi = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${ID}/likes/`;
  const responseGet = await fetch(involvmentApi, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  try {
    const dataGet = await responseGet.json();
    return dataGet;
  } catch (e) {
    return false;
  }
};

export
{
  createLike,
  createItem,
  getLikes,
  createLikeEpisode,
};