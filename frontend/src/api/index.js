import axios from 'axios';
let AUTH_TOKEN = localStorage.getItem('token');

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// ----------------- AUTH API --------------------------
export async function loginUser(data) {
  try {
      var res = await axios.post("/auth/login", data);
      return {data: res.data, status: res.status}
  } catch (error) {
    return {data: error.response.data.error, status: error.response.status}
  }
}
export async function verifyUser(token) {
  try {
      var res = await axios.get("/auth/verify-user", {
        headers: {
          'Authorization': 'Bearer ' + token,
        } 
      });
      return {data: res.data, status: res.status}
  } catch (error) {
    return {data: error.response.data.error, status: error.response.status}
  }
}

// ------------------ ROLES API --------------------------------------

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
      return {data: res.data, status: res.status}
  } catch (error) {
    return {data: error.response.data.error, status: error.response.status}
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
    return {data: res.data, status: res.status}
  } catch (error) {
    return {data: error.response.data.error, status: error.response.status}
  }
}
// Get specific Role
export async function fetchRolePermissions(token) {
  try {
    var res = await axios.get("/role_list/role-items", {
      headers: {
        'Authorization': 'Bearer ' + token,
      } 
    });
    return {data: res.data.data, status: res.status}
  } catch (error) {
    return {data: error.response.data.error, status: error.response.status}
  }
}

// ------------------------- PROFILE PICTURE API --------------------------

// Upload picture
export async function uploadProfile(data) {
  try {
      var res = await axios.post("/picture", data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      return {data: res.data.data, status: res.status}
  } catch (error) {
    return error.response
  }
}
// Get profile picture
export async function getPicture(id) {
  try {
      var res = await axios.get(`/picture/${id}`);
      return {data: res.data.data, status: res.status}
  } catch (error) {
    return error.response
  }
}
//Delete Profile Picture
export async function deletePicture(id) {
  try {
      var res = await axios.delete(`/picture/${id}`);
      return {data: res.data, status: res.status}
  } catch (error) {
    return error.response
  }
}

// --------------------------- EMPLOYEES API -------------------------------

// Add Employee
export async function addEmployee(data) {
  try {
      var res = await axios.post("/employee", data);
      return {data: res.data, status: res.status}
    } catch (error) {
    console.log({ error });
    return {data: error.response.data.error, status: error.response.status}
  }
}
// Get all Employees
export async function getAllEmployeesList() {
  try {
      var res = await axios.get("/employee");
      return {data: res.data.data, status: res.status}
  } catch (error) {
    return error.response
  }
}
// Delete Employee
export async function deleteEmployee(id) {
  try {
      var res = await axios.delete(`/employee/${id}`);
      return {data: res.data, status: res.status}
  } catch (error) {
    return error.response
  }
}
// Update Employee
export async function updateEmployee(id, data) {
  try {
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== '')
      );
      var res = await axios.put(`/employee/${id}`, filteredData);
      return {data: res.data, status: res.status}
  } catch (error) {
    return error.response
  }
}