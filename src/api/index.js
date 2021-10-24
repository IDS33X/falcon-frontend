import axios from 'axios';
import SearchBar from 'material-ui-search-bar';

const API = axios.create({ baseURL: 'https://localhost:5001/falconapi' });
const APItemp = axios.create({ baseURL: 'https://localhost:5001/api' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

APItemp.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

//export const fetchPosts = () => axios.get(url).then((res) => console.log(res.data)).catch((err) => console.log(err));

// Areas
export const fetchAreas = (page, itemsPerPage) => API.get(`/Area/GetAreas?Page=${page}&ItemsPerPage=${itemsPerPage}`);
export const fetchAreasBySearch = (searchQuery) => API.get(`/Area/SearchAreas?Filter=${searchQuery.search || 'none'}&Page=${searchQuery.page}&ItemsPerPage=${searchQuery.itemsPerPage}`);
export const createArea = (newArea) => API.post('/Area/Add', newArea);
export const updateArea = (updatedArea) => API.put('/Area/Update', updatedArea);

// Divisions
export const fetchDivisionsByArea = (searchQuery) => API.get(`/Division/GetDivisionsByArea?AreaId=${searchQuery.areaId}&Page=${searchQuery.page}&ItemsPerPage=${searchQuery.itemsPerPage}`);
export const createDivision = (newDivision) => API.post('/Division/Add', newDivision);
export const fetchDivisionsBySearch = (searchQuery) => API.get(`/Division/SearchDivisionsByArea?AreaId=${searchQuery.areaId}&Filter=${searchQuery.search || 'none'}&Page=${searchQuery.page}&ItemsPerPage=${searchQuery.itemsPerPage}`);
export const updateDivision = (updatedDivision) => API.put('/Division/Update', updatedDivision);

// Departments
export const fetchDepartmentsByDivision = (searchQuery) => API.get(`/Department/GetDepartmentsByDivision?DivisionId=${searchQuery.divisionId}&Page=${searchQuery.page}&ItemsPerPage=${searchQuery.itemsPerPage}`);
export const createDepartment = (newDepartment) => API.post('/Department/Add', newDepartment);
export const fetchDepartmentsBySearch = (searchQuery) => API.get(`/Department/SearchDepartmentsByDivision?DivisionId=${searchQuery.divisionId}&Filter=${searchQuery.search || 'none'}&Page=${searchQuery.page}&ItemsPerPage=${searchQuery.itemsPerPage}`);
export const updateDepartment = (updatedDepartment) => API.put('/Department/Update', updatedDepartment);

// Risk Categories
export const fetchRiskCategoriesByDepartment = (searchQuery) => APItemp.get(`/RiskCategory/GetRiskCategoriesByDepartment?DepartmentId=${searchQuery.departmentId}&Page=${searchQuery.page}&ItemsPerPage=${searchQuery.itemsPerPage}`);
export const createRiskCategory = (newRiskCategory) => APItemp.post('/RiskCategory/Add', newRiskCategory);
export const fetchRiskCategoriesBySearch = (searchQuery) => APItemp.get(`/RiskCategory/GetSearchRiskCategoriesByDepartment?DepartmentId=${searchQuery.departmentId}&Filter=${searchQuery.search || 'none'}&Page=${searchQuery.page}&ItemsPerPage=${searchQuery.itemsPerPage}`);
export const updateRiskCategory = (updatedRiskCategory) => APItemp.put('/RiskCategory/Update', updatedRiskCategory);

//export const fetchArea= (id) => API.get(`/posts/${id}`);