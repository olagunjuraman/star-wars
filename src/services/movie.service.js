const axios = require('axios')


const { getCommentCount } = require("./comment.service");

const getAllMovies = async () => {
  let url = 'https://swapi.dev/api/films/'
    const { data: movies } = await axios.get(url);

  const sortedMovies = movies.results.sort(
    (a, b) => b.release_date - a.release_date
  );

  const resultPromise = sortedMovies.map(async (movie) => {
    const comment_count = await getCommentCount({
      episode_id: movie.episode_id,
    });
    return {
      episode_id: movie.episode_id,
      opening_crawl: movie.opening_crawl,
      comment_count,
      release_date: movie.release_date,
    };
  });

  const result = await Promise.all(resultPromise);
  return result;
};

const getMovie = async (episode_id) => {
    let url = 'https://swapi.dev/api/films/'
    const { data: movies } = await axios.get(url)

  const foundMovie = movies.results.find(
    (movie) => movie.episode_id == episode_id
  );

  if(!foundMovie){
      return
  }
  const comment_count = await getCommentCount({
    episode_id,
  });

  const result = {
    opening_crawl: foundMovie.opening_crawl,
    comment_count,
    release_date: foundMovie.release_date,
    episode_id
  };

  return result;
};

const getMovieCharacters = async (
  episode_id,
  sortBy = "name",
  order = "desc",
  filter = null
) => {
   let url = 'https://swapi.dev/api/films/'
    const { data: movies } = await axios.get(url);

  const foundMovie = movies.results.find(
    (movie) => movie.episode_id == episode_id
  );

  const charactersPromise = foundMovie.characters.map(async (link) => {
    const id = link.split("/")[5];
    let url = `https://swapi.dev/api/people/${id}`

    const { data :charaterDetails} = await axios.get(url)
    return charaterDetails;
  });

  let characters = await Promise.all(charactersPromise);

  if (
    filter &&
    (filter === "male" || filter === "female" || filter === "n/a")
  ) {
    characters = characters.filter(
      (characterDetails) => characterDetails.gender == filter
    );
  }

  const result = characters.sort((a, b) => {
    if (order === "desc") {
      if (a[sortBy] > b[sortBy]) return -1;
      if (a[sortBy] < b[sortBy]) return 1;
      return 0;
    } else if (order === "asc") {
      if (a[sortBy] > b[sortBy]) return 1;
      if (a[sortBy] < b[sortBy]) return -1;
      return 0;
    } else {
      throw new Error("Wrong Order format");
    }
  });

  const totalHeight = result.reduce(function (acc, curr) {
    return acc + Number(curr.height);
  }, 0);


  const metadata = {
    total_characters: result.length,
    total_height_cm: totalHeight,
    total_height_feet_inches: convertToFeetAndInches(totalHeight),
  };

  return { characters: result, metadata };
};


const convertToFeetAndInches = (n)=>{
    const realFeet = ((n*0.393700) / 12);
    const feet = Math.floor(realFeet);
    const inches = ((realFeet - feet) * 12).toFixed(2)
    return `${feet} feet and ${inches} inches  `
  }

module.exports = {
  getAllMovies,
  getMovieCharacters,
  getMovie,
};
