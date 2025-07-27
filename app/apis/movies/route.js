// /api/movies?keyword=
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const encodeQuery = searchParams.get('keyword');
  const query = decodeURIComponent(encodeQuery);

  // doc: https://developer.themoviedb.org/reference/search-movie
  const domain = 'https://api.themoviedb.org';
  const path = `/3/search/movie?query=${query}&include_adult=false&language=zh-TW&page=1`;
  const url = `${domain}${path}`;
  const response = await fetch(url, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  });

  const data = await response.json();
  return Response.json(data);
}
