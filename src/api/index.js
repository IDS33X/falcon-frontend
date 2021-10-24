import axios from 'axios';

const API = axios.create({ baseURL: 'https://localhost:5001/falconapi' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

const options = {
  headers: {
    'Content-Type': 'application/json',
  }
};


//export const fetchPosts = () => axios.get(url).then((res) => console.log(res.data)).catch((err) => console.log(err));

// Areas
export const fetchAreas = (page, itemsPerPage) => API.get(`/Area/GetAreas?Page=${page}&ItemsPerPage=${itemsPerPage}`);
export const fetchAreasBySearch = (searchQuery) => API.get(`/Area/SearchAreas?Filter=${searchQuery.search || 'none'}&Page=${searchQuery.page}&ItemsPerPage=${searchQuery.itemsPerPage}`)

export const fetchArea = (id) => API.get(`/posts/${id}`);


// Users

export const fetchUsers = (departmentId, page, itemsPerPage) => API.get(`/User/GetUsersByDepartment?DepartmentId=${departmentId}&Page=${page}&ItemsPerPage=${itemsPerPage}`)

export const fetchUsersBySearch = (departmentId, page, filter, itemsPerPage) => API.get(`User/SearchUsersByDepartment?DepartmentId=${departmentId}&Filter=${filter}&Page=${page}&ItemsPerPage=${itemsPerPage}`)

export const fetchUser = (id) => API.get(`/User/GetById?id=${id}`);

export const addUser = (user) => API.post(`/User/Add`, user, { "headers": options.headers });

export const updateProfile = (user) => API.put(`/User/UpdateProfile`, user, { "headers": options.headers });

export const updateLogin = (user) => API.put(`/User/UpdateLogin`, user, { "headers": options.headers });


// Risks Impacts

export const fetchRiskImpacts = () => API.get(`/RiskImpact/GetAll`)

// Risks

export const fetchRiskByCategory = (riskCategoryId, page, itemsPerPage) => API.get(`/Risk/GetRiskByCategory?RiskCategoryId=${riskCategoryId}&Page=${page}&ItemsPerPage=${itemsPerPage}`)
export const searchRiskByCode = (riskCategoryId, page, itemsPerPage, filter) => API.get(`/Risk/GetRiskByCategoryAndCode?RiskCategoryId=${riskCategoryId}&Filter=${filter}&Page=${page}&ItemsPerPage=${itemsPerPage}`)
export const searchRiskByDescription = (riskCategoryId, page, filter, itemsPerPage) => API.get(`/Risk/GetRiskByCategoryAndDescription?RiskCategoryId=${riskCategoryId}&Filter=${filter}&Page=${page}&ItemsPerPage=${itemsPerPage}`);
export const addRisk = (risk) => API.post(`/Risk/Add`, risk, { "headers": options.headers });
export const updateRisk = (risk) => API.put(`/Risk/Update`, risk, { "headers": options.headers });

// RiskControl 

export const AddRangeRiskControls = (riskControls) => API.post(`/RiskControl/AddRange`, riskControls);
export const RemoveRangeRiskControls = (riskControls) => API.put(`/RiskControl/RemoveRange`, riskControls);



// Controls

export const fetchControls = (page, itemsPerPage) => API.get(`/Control/GetControls?Page=${page}&ItemsPerPage=${itemsPerPage}`);
export const fetchControlsByRisk = (riskId, page, itemsPerPage) => API.get(`/Control/GetControlsByRisk?RiskId=${riskId}&Page=${page}&ItemsPerPage=${itemsPerPage}`);
export const searchControlsByCode = (code) => API.get(`/Control/GetControlByCode?Code=${code}`);
export const addControl = (control) => API.post(`/Control/Add`, control, { "headers": options.headers });
export const updateControl = (control) => API.put(`/Control/Update`, control, { "headers": options.headers });


// Automation Level

export const fetchAutomationLevels = () => API.get(`/AutomationLevel/GetAll`);

// Control states 

export const fetchControlStates = () => API.get(`/ControlState/GetAll`);

// Control types 

export const fetchControlTypes = () => API.get(`/ControlType/GetAll`);



