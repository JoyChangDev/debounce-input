const domain = 'https://api.themoviedb.org';
const auth = `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`;

export default async function fetcher(path, options = {}) {
  const url = `${domain}${path}`;
  const { method, body } = options;

  const res = await fetch(url, {
    method: method || 'GET',
    headers: {
      accept: 'application/json',
      Authorization: auth,
    },
    ...(method === 'POST' && {
      body: JSON.stringify(body) || '',
    }),
  });

  return await res.json();
}
