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
      return {data: res.data, status: res.status}
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

// --------------------------- EMPLOYEES API -------------------------------

// Add Employee
export async function addEmployee(data) {
  try {
      var res = await axios.post("/employee", data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
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
      var res = await axios.put(`/employee/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      return {data: res.data, status: res.status}
  } catch (error) {
    return error.response
  }
}

// --------------------------- UNIT API -------------------------------
// Add Unit
export async function addUnit(data) {
  try {
      var res = await axios.post("/unit", data);
      return {data: res.data, status: res.status}
    } catch (error) {
    console.log({ error });
    return {data: error.response.data.error, status: error.response.status}
  }
}
// Get all Units
export async function getAllUnits() {
  try {
      var res = await axios.get("/unit");
      return {data: res.data.data, status: res.status}
  } catch (error) {
    return error.response
  }
}
// Delete Unit
export async function deleteUnit(id) {
  try {
      var res = await axios.delete(`/unit/${id}`);
      return {data: res.data, status: res.status}
  } catch (error) {
    return error.response
  }
}
// Update Unit
export async function updateUnit(id, data) {
  try {
      var res = await axios.put(`/unit/${id}`, data);
      return {data: res.data, status: res.status}
  } catch (error) {
    return error.response
  }
}

// --------------------------- BRANDS API -------------------------------
// Add Brand
export async function addBrand(data) {
  try {
      var res = await axios.post("/brand", data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      return {data: res.data, status: res.status}
    } catch (error) {
    console.log({ error });
    return {data: error.response.data.error, status: error.response.status}
  }
}
// Get all Brands
export async function getAllBrand() {
  try {
      var res = await axios.get("/brand");
      return {data: res.data.data, status: res.status}
  } catch (error) {
    return error.response
  }
}
// Delete Brand
export async function deleteBrand(id) {
  try {
      var res = await axios.delete(`/brand/${id}`);
      return {data: res.data, status: res.status}
  } catch (error) {
    return error.response
  }
}
// Update Brand
export async function updateBrand(id, data) {
  try {
      var res = await axios.put(`/brand/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      return {data: res.data, status: res.status}
  } catch (error) {
    return error.response
  }
}


// --------------------------- Categories API -------------------------------
// Add Category
export async function addCategory(data) {
  try {
      var res = await axios.post("/category", data);
      return {data: res.data, status: res.status}
    } catch (error) {
    console.log({ error });
    return {data: error.response.data.error, status: error.response.status}
  }
}
// Get all Categories
export async function getAllCategories() {
  try {
      var res = await axios.get("/category");
      return {data: res.data.data, status: res.status}
  } catch (error) {
    return error.response
  }
}
// Delete Category
export async function deleteCategory(id) {
  try {
      var res = await axios.delete(`/category/${id}`);
      return {data: res.data, status: res.status}
  } catch (error) {
    return error.response
  }
}
// Update Category
export async function updateCategory(id, data) {
  try {
      var res = await axios.put(`/category/${id}`, data);
      return {data: res.data, status: res.status}
  } catch (error) {
    return error.response
  }
}

// --------------------------- SUPPLIERS API -------------------------------
// Add Supplier
export async function addSupplier(data) {
  try {
      var res = await axios.post("/supplier", data);
      return {data: res.data, status: res.status}
    } catch (error) {
    console.log({ error });
    return {data: error.response.data.error, status: error.response.status}
  }
}
// Get all Supplier
export async function getAllSuppliers() {
  try {
      var res = await axios.get("/supplier");
      return {data: res.data.data, status: res.status}
  } catch (error) {
    return error.response
  }
}
// Get Supplier by Id
export async function getSupplierById(id) {
  try {
      var res = await axios.get(`/supplier/${id}`);
      return {data: res.data.data, status: res.status}
  } catch (error) {
    return error.response
  }
}
// Delete Supplier
export async function deleteSupplier(id) {
  try {
      var res = await axios.delete(`/supplier/${id}`);
      return {data: res.data, status: res.status}
  } catch (error) {
    return error.response
  }
}
// Update Supplier
export async function updateSupplier(id, data) {
  try {
      var res = await axios.put(`/supplier/${id}`, data);
      return {data: res.data, status: res.status}
  } catch (error) {
    return error.response
  }
}
