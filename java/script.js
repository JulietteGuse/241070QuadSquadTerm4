// Define common options for fetch requests
const options3 = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDhhNGJiMGRmNmRlYzgwNWFhMDBiMzA4N2YxMWI0YiIsIm5iZiI6MTczMDExOTA4Ni44NTk0NjgsInN1YiI6IjY3MDNkYjg0MTc0YTFkNTc3Mzc5NWUzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Spo5pYHAnznZDGNubHLDjwxWyMH4FkVgahATUbe50VE'
  }
};

// Base URL for posters from TMDb
const posterBaseUrl2 = 'https://image.tmdb.org/t/p/w500';

// Function to fetch movie details (director, cast, trailer, and poster) using movie ID
const fetchMovieDetails2 = async (movieId) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits,videos`, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.status}`);
    }
    const data = await response.json();

    // Extract director, cast, trailer, poster, and release date details
    const director = data.credits.crew.find(person => person.job === 'Director')?.name || 'Unknown';
    const cast = data.credits.cast.slice(0, 5).map(actor => actor.name).join(', ');
    const trailer = data.videos.results.find(video => video.type === 'Trailer')?.key || 'No Trailer';
    const posterUrl = data.poster_path ? `${posterBaseUrl}${data.poster_path}` : 'No Poster Available';

    return {
      id: movieId, 
      title: data.title,
      director,
      cast,
      overview: data.overview,
      rating: data.vote_average,
      poster: posterUrl,  // Poster URL
      trailer: `https://www.youtube.com/watch?v=${trailer}`,
      release_date: data.release_date || 'Unknown'
    };
  } catch (error) {
    console.error(`Error fetching details for movie ID ${movieId}:`, error);
    return null; // Return null in case of error to avoid breaking Promise.all
  }
};

// Function to fetch a list of movies and their details by URL and category
const fetchMovies = async (url, category) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${category} movies: ${response.status}`);
    }
    const data = await response.json();

    const movieDetailsPromises = data.results.slice(0, 15).map(movie => fetchMovieDetails(movie.id));
    const movieDetails = await Promise.all(movieDetailsPromises);

    console.log(`${category} Movies:`, movieDetails);
    return movieDetails; // Optional: you can return movie details for further use
  } catch (error) {
    console.error(`Error fetching ${category} movies:`, error);
  }
};

// Fetch upcoming movies
const fetchUpcomingMovies = async () => {
  const url = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
  await fetchMovies(url, 'Upcoming');
};

// Fetch top-rated movies
const fetchTopRatedMovies = async () => {
  const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
  await fetchMovies(url, 'Top-Rated');
};

// Genres array
const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 99, name: 'Biography (Documentary)' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' }
];

// Function to fetch movies by genre
const fetchMoviesByGenre = async (genreId, genreName) => {
  const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&page=1`;
  await fetchMovies(url, genreName);
};

// Fetch movies for each genre
genres.forEach(genre => fetchMoviesByGenre(genre.id, genre.name));

// Fetch trending movies
const fetchTrendingMovies = async () => {
  const url = 'https://api.themoviedb.org/3/trending/movie/week?language=en-US';
  await fetchMovies(url, 'Trending Now');
};

// Fetch popular movies
const fetchPopularMovies = async () => {
  const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US';
  await fetchMovies(url, 'Popular');
};

// Fetch premiere movies (now playing)
const fetchPremiereMovies = async () => {
  const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US';
  await fetchMovies(url, 'Premiere');
};

// Start fetching movies for all categories
fetchUpcomingMovies();
fetchTopRatedMovies();
fetchTrendingMovies();
fetchPopularMovies();
fetchPremiereMovies();



const displayMovieCards = (movies) => {
  const movieContainer = document.getElementById('movieContainer');
  movieContainer.innerHTML = '';

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    
    movieCard.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}">
      <h3>${movie.title}</h3>
    `;

    // Save movie ID to localStorage and redirect to individual page on click
    movieCard.addEventListener('click', () => {
      localStorage.setItem('selectedMovieId', movie.id);
      window.location.href = 'html/individual.html'; // Redirect to individual page
    });

    movieContainer.appendChild(movieCard);
  });
};





document.addEventListener('DOMContentLoaded', async () => {
  const movieId = localStorage.getItem('selectedMovieId');

  if (movieId) {
    const movieDetails = await fetchMovieDetails(movieId);

    if (movieDetails) {
      document.getElementById('movieTitle').textContent = movieDetails.title;
      document.getElementById('moviePoster').src = movieDetails.poster;
      document.getElementById('movieOverview').textContent = movieDetails.overview;
      document.getElementById('movieDirector').textContent = movieDetails.director;
      document.getElementById('movieCast').textContent = movieDetails.cast;
      document.getElementById('movieReleaseDate').textContent = movieDetails.release_date;
      document.getElementById('movieRating').textContent = movieDetails.rating;
      
      // Add trailer link
      const trailerLink = document.getElementById('movieTrailer');
      trailerLink.href = movieDetails.trailer;
      trailerLink.textContent = 'Watch Trailer';
    } else {
      console.error('Movie details could not be loaded.');
    }
  } else {
    console.error('No movie ID found in localStorage.');
  }
});








//andre//

//signUp//
const signUp = () => {
var username = document.getElementById("username").value
var email = document.getElementById("email").value
var password = document.getElementById("password").value

var user = {
  username: username,
  email: email,
  password: password,
}
//
var json = JSON.stringify(user)
localStorage.setItem(user, json);
console.log("user added");

} 
console.log(username)
console.log(email)
console.log(password)
