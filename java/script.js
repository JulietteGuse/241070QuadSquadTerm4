const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer df5d5249f7bb070d5b49df49cd2c7c74'
  }
};

fetch('https://api.themoviedb.org/3/movie/movie_id?language=en-US', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

  console.log(fetch)