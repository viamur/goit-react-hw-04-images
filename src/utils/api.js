import axios from 'axios';

const api = async (query, page) => {
  const searchParams = new URLSearchParams({
    q: query,
    page,
    key: '28511639-fd0b78e787d23185784d45556',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });

  const { data } = await axios.get(`https://pixabay.com/api/?${searchParams}`);

  if (data.totalHits === 0) {
    throw new Error('Ничего не найдено');
  }
  return data;
};

export default api;
