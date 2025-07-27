const mock = [
  {
    id: 1,
    title: '阿凡達',
    year: 2009,
    genre: '科幻',
    rating: 8.5,
  },
  {
    id: 2,
    title: '復仇者聯盟',
    year: 2012,
    genre: '動作',
    rating: 8.0,
  },
  {
    id: 3,
    title: '星際大戰',
    year: 1977,
    genre: '科幻',
    rating: 8.6,
  },
  {
    id: 4,
    title: '鐵達尼號',
    year: 1997,
    genre: '愛情',
    rating: 7.9,
  },
  {
    id: 5,
    title: '教父',
    year: 1972,
    genre: '犯罪',
    rating: 9.2,
  },
  {
    id: 6,
    title: '魔戒',
    year: 2001,
    genre: '奇幻',
    rating: 8.8,
  },
  {
    id: 7,
    title: '駭客任務',
    year: 1999,
    genre: '科幻',
    rating: 8.7,
  },
  {
    id: 8,
    title: '侏羅紀公園',
    year: 1993,
    genre: '冒險',
    rating: 8.1,
  },
  {
    id: 9,
    title: '終結者',
    year: 1984,
    genre: '科幻',
    rating: 8.0,
  },
  {
    id: 10,
    title: '回到未來',
    year: 1985,
    genre: '科幻',
    rating: 8.5,
  },
];

export default async function searchMovies(keyword) {
  return mock.filter(
    (movie) =>
      movie.title.toLowerCase().includes(keyword) ||
      movie.genre.toLowerCase().includes(keyword) ||
      movie.year.toString().includes(keyword)
  );
}
