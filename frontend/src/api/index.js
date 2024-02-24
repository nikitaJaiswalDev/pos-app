import axios from 'axios';
// let AUTH_TOKEN = localStorage.getItem('token');

axios.defaults.baseURL = 'http://localhost:5000';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Get all Role Names
export async function getAllRolesNames() {
    try {
        var res = await axios.get("/role_names");
        return res.data
    } catch (error) {
      return error.response
    }
}

// Add Role list item
export async function addRole(data) {
  try {
      var res = await axios.post("/role_list", data);
      return res.data
  } catch (error) {
    return error.response
  }
}
// Get all Roles List
export async function getAllRolesList() {
  try {
      var res = await axios.get("/role_list");
      return res.data.data
  } catch (error) {
    return error.response
  }
}
// Delete Role
export async function deleteRole(id) {
  try {
      var res = await axios.delete(`/role_list/${id}`);
      return res.data
  } catch (error) {
    return error.response
  }
}
// Get one Role
export async function getOneRole(id) {
  try {
      var res = await axios.get(`/role_list/${id}`);
      return res.data
  } catch (error) {
    return error.response
  }
}
// Edit Role
export async function editRole(id, data) {
  try {
      var res = await axios.put(`/role_list/${id}`, data);
      return res.data
  } catch (error) {
    return error.response
  }
}
