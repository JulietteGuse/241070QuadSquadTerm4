const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNWRiYmRjMzFjM2M2MDgwMzlhMTI5OTQwN2EwMDIyZSIsIm5iZiI6MTcyOTA4MDc4MC42MTE5MzEsInN1YiI6IjY3MDNkYjg0MTc0YTFkNTc3Mzc5NWUzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cD8EeJn5B_vExqSjpWULT2bfVKFw55ipTDQ_4UTbFJc'
}
};

// Function to fetch movie details (director, cast, and trailer) using movie ID
const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits,videos`, options);
    const data = await response.json();

    // Extract director, cast, and trailer details
    const director = data.credits.crew.find(person => person.job === 'Director')?.name || 'Unknown';
    const cast = data.credits.cast.slice(0, 5).map(actor => actor.name).join(', ');
    const trailer = data.videos.results.find(video => video.type === 'Trailer')?.key || 'No Trailer';

    return {
      title: data.title,
      director: director,
      cast: cast,
      overview: data.overview,
      rating: data.vote_average,
      trailer: `https://www.youtube.com/watch?v=${trailer}`
    };
  } catch (error) {
    console.error(`Error fetching details for movie ID ${movieId}:`, error);
    return null;
  }
};

// Function to fetch a list of movies and their details
const fetchMovies = async (url, category) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    const movieDetailsPromises = data.results.slice(0, 15).map(movie => fetchMovieDetails(movie.id));
    const movieDetails = await Promise.all(movieDetailsPromises);

    console.log(`${category} Movies:`, movieDetails);
  } catch (error) {
    console.error(`Error fetching ${category} movies:`, error);
  }
};

// Fetch upcoming movies
const fetchUpcomingMovies = async () => {
  const upcomingUrl = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
  await fetchMovies(upcomingUrl, 'Upcoming');
};

// Fetch top-rated movies
const fetchTopRatedMovies = async () => {
  const topRatedUrl = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
  await fetchMovies(topRatedUrl, 'Top-Rated');
};

// Fetch both upcoming and top-rated movies
fetchUpcomingMovies();
fetchTopRatedMovies();




//Genres
const optionsGenre = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNWRiYmRjMzFjM2M2MDgwMzlhMTI5OTQwN2EwMDIyZSIsIm5iZiI6MTcyOTA4MDc4MC42MTE5MzEsInN1YiI6IjY3MDNkYjg0MTc0YTFkNTc3Mzc5NWUzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cD8EeJn5B_vExqSjpWULT2bfVKFw55ipTDQ_4UTbFJc'
}
};

// Function to fetch movie details (director, cast, and trailer) using movie ID
const fetchMovieDetailsGenre = async (movieId) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits,videos`, optionsGenre);
    const data = await response.json();

    // Extract director, cast, and trailer details
    const director = data.credits.crew.find(person => person.job === 'Director')?.name || 'Unknown';
    const cast = data.credits.cast.slice(0, 5).map(actor => actor.name).join(', ');
    const trailer = data.videos.results.find(video => video.type === 'Trailer')?.key || 'No Trailer';

    return {
      title: data.title,
      director: director,
      cast: cast,
      overview: data.overview,
      rating: data.vote_average,
      trailer: `https://www.youtube.com/watch?v=${trailer}`
    };
  } catch (error) {
    console.error(`Error fetching details for movie ID ${movieId}:`, error);
    return null;
  }
};

// Function to fetch a list of movies by genre and their details
const fetchMoviesByGenre = async (genreId, genreName) => {
  try {
    const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&page=1`;
    const response = await fetch(url, optionsGenre);
    const data = await response.json();

    const movieDetailsPromises = data.results.slice(0, 15).map(movie => fetchMovieDetailsGenre(movie.id));
    const movieDetails = await Promise.all(movieDetailsPromises);

    console.log(`${genreName} Movies:`, movieDetails);
  } catch (error) {
    console.error(`Error fetching ${genreName} movies:`, error);
  }
};

// Genre IDs and Names
const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 99, name: 'Biography (Documentary)' },  // Using Documentary for Biography
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' }
];

// Fetch movies for each genre
genres.forEach(genre => fetchMoviesByGenre(genre.id, genre.name));





// Categories

const optionsCategory = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNWRiYmRjMzFjM2M2MDgwMzlhMTI5OTQwN2EwMDIyZSIsIm5iZiI6MTcyOTA4MDc4MC42MTE5MzEsInN1YiI6IjY3MDNkYjg0MTc0YTFkNTc3Mzc5NWUzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cD8EeJn5B_vExqSjpWULT2bfVKFw55ipTDQ_4UTbFJc'
  }
};

// Function to fetch movie details (director, cast, and trailer) using movie ID
const fetchMovieDetailsCategory = async (movieId) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits,videos`, optionsCategory);
    const data = await response.json();

    // Extract director, cast, and trailer details
    const director = data.credits.crew.find(person => person.job === 'Director')?.name || 'Unknown';
    const cast = data.credits.cast.slice(0, 5).map(actor => actor.name).join(', ');
    const trailer = data.videos.results.find(video => video.type === 'Trailer')?.key || 'No Trailer';

    return {
      title: data.title,
      director: director,
      cast: cast,
      overview: data.overview,
      rating: data.vote_average,
      trailer: `https://www.youtube.com/watch?v=${trailer}`
    };
  } catch (error) {
    console.error(`Error fetching details for movie ID ${movieId}:`, error);
    return null;
  }
};

// Function to fetch movies by category and their details
const fetchMoviesByCategory = async (url, categoryName) => {
  try {
    const response = await fetch(url, optionsCategory);
    const data = await response.json();

    const movieDetailsPromises = data.results.slice(0, 15).map(movie => fetchMovieDetailsCategory(movie.id));
    const movieDetails = await Promise.all(movieDetailsPromises);

    console.log(`${categoryName} Movies:`, movieDetails);
  } catch (error) {
    console.error(`Error fetching ${categoryName} movies:`, error);
  }
};

// Fetch trending movies
const fetchTrendingMovies = async () => {
  const url = 'https://api.themoviedb.org/3/trending/movie/week?language=en-US';
  await fetchMoviesByCategory(url, 'Trending Now');
};

// Fetch popular movies
const fetchPopularMovies = async () => {
  const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US';
  await fetchMoviesByCategory(url, 'Popular');
};

// Fetch premiere movies (Using now playing as 'Premiere')
const fetchPremiereMovies = async () => {
  const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US';
  await fetchMoviesByCategory(url, 'Premiere');
};

// Start fetching movies for each category
fetchTrendingMovies();
fetchPopularMovies();
fetchPremiereMovies();






//HTML template full

