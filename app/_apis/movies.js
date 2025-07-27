import fetcher from './fetcher';

// https://developer.themoviedb.org/reference/search-movie
export default async function getMovies(keyword) {
  const path = `/3/search/movie?query=${keyword}&include_adult=true&language=zh-TW&page=1`;
  return await fetcher(path);
}
