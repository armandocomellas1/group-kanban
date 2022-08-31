const createLike = async (createIDShow) => {
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

  if (dataPost === 'Created') {
    const getParents = event.target.parentElement.firstChild.nextSibling.className;
    let getItemsNum = 0;
    if (dataGet !== '') {
      getItemsNum = JSON.parse(dataGet)[0].likes;
      getItemsNum = Number(getItemsNum) + 1;
    } else {
      getItemsNum = 1;
    }
    const sumLikes = getItemsNum;
    const concaString = `${sumLikes} Likes`;
    document.getElementsByClassName(getParents)[0].innerHTML = concaString;
  }
};

const getLikes = async (ID) => {
  const involvmentApi = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${ID}/likes/`;
  const responseGet = await fetch(involvmentApi, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const dataGet = await responseGet.text();
  if (dataGet !== '') {
    // const getParents = event.target.parentElement.firstChild.nextSibling.className;
    const getItemsNum = JSON.parse(dataGet);
    const sumLikes = getItemsNum[0].likes;
    console.log('sumLikes', sumLikes);
    // const concaString = `${sumLikes} Likes`;
    // document.getElementsByClassName(getParents)[0].innerHTML = concaString;
  }
};

export { createLike, createItem, getLikes };