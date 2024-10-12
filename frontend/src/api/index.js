import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5001/';
// axios.defaults.baseURL = 'https://pos-app-lb4s.onrender.com/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

console.log({ process: process.env.API_URL})

// Function to handle 401 errors
const handle401Error = () => {
  localStorage.removeItem('token')
  window.location.href = '/login';
};
// Add Request intercepter
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      handle401Error();
    }
    return Promise.reject(error);
  }
);

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
export async function getAllEmployeesList({ limit, skip }) {
  try {
      var res = await axios.get(`/employee?limit=${limit}&skip=${skip}`);
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
export async function getAllUnits({ limit, skip }) {
  try {
      var res = await axios.get(`/unit`);
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
export async function getAllBrand({ limit, skip }) {
  try {
      var res = await axios.get(`/brand?limit=${limit}&skip=${skip}`);
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
export async function getAllCategories({ limit, skip }) {
  try {
      var res = await axios.get(`/category?limit=${limit}&skip=${skip}`);
      return {data: res.data, status: res.status}
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
export async function getAllSuppliers({ limit, skip }) {
  try {
      var res = await axios.get(`/supplier?limit=${limit}&skip=${skip}`);
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


// --------------------------- PRODUCTS API -------------------------------
// Add Product
export async function addProduct(data) {
  try {
      var res = await axios.post("/product", data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      return {data: res.data, status: res.status}
    } catch (error) {
    return {data: error.response.data.error, status: error.response.status}
  }
}
// Get all Products
export async function getAllProducts({ limit, skip, filter }) {
  try {
      var res = await axios.get(`/product?limit=${limit}&skip=${skip}&category=${filter?.category}&text=${filter?.text}`);
      return {data: res.data.data, status: res.status}
  } catch (error) {
    return error.response
  }
}
// Delete Product
export async function deleteProduct(id) {
  try {
      var res = await axios.delete(`/product/${id}`);
      return {data: res.data, status: res.status}
  } catch (error) {
    return error.response
  }
}
// Update Product
export async function updateProduct(id, data) {
  try {
      var res = await axios.put(`/product/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      return {data: res.data, status: res.status}
  } catch (error) {
    return error.response
  }
}
// Get Product by Id
export async function getProductById(id) {
  try {
      var res = await axios.get(`/product/${id}`);
      return {data: res.data.data, status: res.status}
  } catch (error) {
    return error.response
  }
}

// --------------------------- CUSTOMER API -------------------------------
// Add Customer
export async function addCustomer(data) {
  try {
      var res = await axios.post("/customer", data);
      return {data: res.data, status: res.status}
    } catch (error) {
    console.log({ error });
    return {data: error.response.data.error, status: error.response.status}
  }
}
// Get all Customers
export async function getAllCustomers({ limit, skip }) {
  try {
      var res = await axios.get(`/customer?limit=${limit}&skip=${skip}`);
      return {data: res.data.data, status: res.status}
  } catch (error) {
    return error.response
  }
}
// Delete Customer
export async function deleteCustomert(id) {
  try {
      var res = await axios.delete(`/customer/${id}`);
      return {data: res.data, status: res.status}
  } catch (error) {
    return error.response
  }
}
// Update Customer
export async function updateCustomer(id, data) {
  try {
      var res = await axios.put(`/customer/${id}`, data);
      return {data: res.data, status: res.status}
  } catch (error) {
    return error.response
  }
}
// Get Customer by Id
export async function getCustomerById(id) {
  try {
      var res = await axios.get(`/customer/${id}`);
      return {data: res.data.data, status: res.status}
  } catch (error) {
    return error.response
  }
}

// --------------------------- SHOPS API -------------------------------

// Get all Shops
export async function getShop() {
  try {
      var res = await axios.get("/shop");
      return {data: res.data.data, status: res.status}
  } catch (error) {
    return error.response
  }
}

export async function getShopLogo() {
  try {
      var res = await axios.get("/shop/get-shop-logo");
      return {data: res.data.data, status: res.status}
  } catch (error) {
    return error.response
  }
}
// Update Shop
export async function updateShop(id, data) {
  try {
      var res = await axios.put(`/shop/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      return {data: res.data, status: res.status}
  } catch (error) {
    return error.response
  }
}


// --------------------------- ORDERS API -------------------------------
// Add order
export async function addOrder(data) {
  try {
      var res = await axios.post("/order", data);
      return {data: res.data, status: res.status}
    } catch (error) {
    console.log({ error });
    return {data: error.response.data.error, status: error.response.status}
  }
}
// Get all Orders
export async function getAllOrders({ limit, skip }) {
  try {
      var res = await axios.get(`/order?limit=${limit}&skip=${skip}`);
      return {data: res.data, status: res.status}
  } catch (error) {
    return error.response
  }
}


// Get Stats Value
export async function getStats() {
  try {
      var res = await axios.get(`/stats`);
      return {data: res.data, status: res.status}
  } catch (error) {
    return error.response
  }
}


// Get Stats Value
export async function getChartStats(data) {
  try {
      var res = await axios.get(`/order/chart/${data.type}`);
      return {data: res.data, status: res.status}
  } catch (error) {
    return error.response
  }
}
