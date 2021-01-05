const KEY = "33cf18d4c93b34da62ca70e7b69b30cc";
const URL = "https://api.themoviedb.org/3/";

async function fetchAPI(url = "", config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error("Not found"));
}

export function popular() {
  return fetchAPI(`${URL}trending/movie/day?api_key=${KEY}`);
}

export function searchWord(name, page = 1) {
  return fetchAPI(
    `${URL}search/movie?api_key=${KEY}&language=en-US&query=${name}&page=${page}&include_adult=false`
  );
}

export function movie(id) {
  return fetchAPI(`${URL}movie/${id}?api_key=${KEY}&language=en-US`);
}

export function actors(id) {
  return fetchAPI(`${URL}movie/${id}/credits?api_key=${KEY}&language=en-US`);
}

export function reviews(id, page = 1) {
  return fetchAPI(
    `${URL}movie/${id}/reviews?api_key=${KEY}&language=en-US&page=${page}`
  );
}
