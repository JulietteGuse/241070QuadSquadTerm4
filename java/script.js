const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer df5d5249f7bb070d5b49df49cd2c7c74'
    }
  };
  
  // Array of movie IDs you want to fetch details for
  const movieIds = [550, 680, 299536]; // Replace with actual movie IDs
  
  // Function to fetch details for each movie
  const fetchMovies = async (ids) => {
    for (const id of ids) {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options);
        const data = await response.json();
        console.log(data); // Display each movie's details in the console
      } catch (err) {
        console.error(`Error fetching movie with ID ${id}:`, err);
      }
    }
  };
  
  // Call the function with the array of movie IDs
  fetchMovies(movieIds);