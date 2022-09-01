const url = 'https://api.themoviedb.org/3/movie/550?api_key=346a39160688fd6b7c615712dce07126';
const idApp = '345Y6E73yjavl4eR3trH';

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

const catchComments = async (_id) => {
  const response = await fetch(`${url}${idApp}/comments/${_id}`);
  const comments = await response.json();
  return comments;
};

export {
  submitLikes, catchLikes, submitComments, catchComments,
};
