const url = 'https://api.themoviedb.org/3/movie/550?api_key=346a39160688fd6b7c615712dce07126';
const idApp = '345Y6E73yjavl4eR3trH';
const urlComments = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';

const submitLikes = async (elementId) => {
  const response = await fetch(`${url}${idApp}/likes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item_id: elementId }),
  });
  const data = await response.text();
  return data;
};

const catchLikes = async () => {
  const response = await fetch(`${url}${idApp}/likes`);
  const likes = await response.json();
  return likes;
};

const submitComments = async (_id, _name, _comment) => {
  const response = await fetch(`${url}${idApp}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: _id,
      name: _name,
      comment: _comment,
    }),
  });
  const post = await response.text();
  return post;
};

const getComments = async (ID) => {
  const involvmentApi = `${urlComments}/${ID}/comments?item_id=${ID}`;
  const responseGet = await fetch(involvmentApi, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  try {
    const dataGet = await responseGet.json();
    console.log('GetData', dataGet);
    const getComment = dataGet[0].comment;
    const getDate = dataGet[0].creation_date;
    const getUserName = dataGet[0].username;
    document.getElementById('comment1').innerHTML = getComment + ' ' +  getUserName + ' ' + getDate;
    return dataGet;
  } catch (e) {
    return false;
  }
};

const createComments = async (ID, name, message) => {
  const response = await fetch(`${urlComments}/${ID}/comments`, {
    method: 'POST',
    body: JSON.stringify({
      item_id: ID,
      username: name,
      comment: message,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (response.status === 201) {
    const data = await response.text();
    console.log('postData', data);
    getComments(ID);
    return [data];
  }
  return false;
};

const catchComments = async (ID, name, message) => {
  let getId;
  const response = await fetch(urlComments, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (response.status === 201) {
    const data = await response.text();
    getId = data;
    localStorage.setItem('getId', getId);
    console.log('checkcreateID', getId);
    console.log('name', name);
    console.log('message', message);
    createComments(getId, name, message);
    return [data];
  }
  return false;
};

export {
  submitLikes, catchLikes, submitComments, catchComments, getComments,
};
