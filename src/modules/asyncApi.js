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

// const catchComments = async (_id) => {
//   const response = await fetch(`${url}${idApp}/likes`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ item_id: elementId }),
//   });
//   return comments;
// };

const createComments = async (ID) => {
  const response = await fetch(`${urlComments}/${ID}/comments`, {
    method: 'POST',
    body: JSON.stringify({
      item_id: ID,
      username: ID,
      comment: ID,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (response.status === 201) {
    const data = await response.text();
    console.log('data_comments', data);
    return [data];
  }
  return false;
};

const catchComments = async () => {
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
    console.log('getId', getId);
    const gets = document.getElementsByClassName('popup__name-form')[0].value;
    console.log('gets', gets);

    createComments(getId);
    return [data];
  }
  return false;
};

export {
  submitLikes, catchLikes, submitComments, catchComments,
};
