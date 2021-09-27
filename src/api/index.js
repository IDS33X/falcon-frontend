import axios from 'axios';
import SearchBar from 'material-ui-search-bar';

const API = axios.create({ baseURL: 'https://localhost:5001/falconapi' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

//export const fetchPosts = () => axios.get(url).then((res) => console.log(res.data)).catch((err) => console.log(err));

// Areas
export const fetchAreas = (page, itemsPerPage) => API.get(`/Area/GetAreas?Page=${page}&ItemsPerPage=${itemsPerPage}`);
export const fetchAreasBySearch = (searchQuery) => API.get(`/Area/SearchAreas?Filter=${searchQuery.search || 'none'}&Page=${searchQuery.page}&ItemsPerPage=${searchQuery.itemsPerPage}`)

export const fetchArea= (id) => API.get(`/posts/${id}`);