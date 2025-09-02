let API_BASE_URL = 'http://localhost:5000/api';
let authToken = null;

export const setApiBaseUrl = (url) => {
  API_BASE_URL = url;
};

export const setAuthToken = (token) => {
  authToken = token || null;
};

const buildHeaders = (extra = {}) => {
  const headers = { ...extra };
  if (!headers['Content-Type'] && !(extra instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  return headers;
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const api = {
  // Categories
  getCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      headers: buildHeaders(),
    });
    return handleResponse(response);
  },

  // Blog
  getBlogPosts: async () => {
    const response = await fetch(`${API_BASE_URL}/blog`, {
      headers: buildHeaders(),
    });
    return handleResponse(response);
  },
  getBlogPostBySlug: async (slug) => {
    const response = await fetch(`${API_BASE_URL}/blog/${slug}`, {
      headers: buildHeaders(),
    });
    return handleResponse(response);
  },

  // Products
  getAllProducts: async (params = {}) => {
    const queryParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });
    const response = await fetch(`${API_BASE_URL}/products?${queryParams}`, {
      headers: buildHeaders(),
    });
    return handleResponse(response);
  },

  getProductBySlug: async (slug) => {
    const response = await fetch(`${API_BASE_URL}/products/${slug}`, {
      headers: buildHeaders(),
    });
    return handleResponse(response);
  },

  getProductsByCategory: async (categorySlug) => {
    const response = await fetch(`${API_BASE_URL}/categories/${categorySlug}/products`, {
      headers: buildHeaders(),
    });
    return handleResponse(response);
  },

  getProductImages: async (productId) => {
    const response = await fetch(`${API_BASE_URL}/products/${productId}/images`, {
      headers: buildHeaders(),
    });
    return handleResponse(response);
  },

  // Auth
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: buildHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: buildHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  // Admin - Products CRUD
  admin: {
    products: {
      list: async (params = {}) => {
        const queryParams = new URLSearchParams();
        Object.keys(params).forEach(key => {
          if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
            queryParams.append(key, params[key]);
          }
        });
        const response = await fetch(`${API_BASE_URL}/admin/products?${queryParams}`, {
          headers: buildHeaders(),
        });
        return handleResponse(response);
      },
      create: async (payload) => {
        const response = await fetch(`${API_BASE_URL}/admin/products`, {
          method: 'POST',
          headers: buildHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(payload),
        });
        return handleResponse(response);
      },
      update: async (id, payload) => {
        const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
          method: 'PUT',
          headers: buildHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(payload),
        });
        return handleResponse(response);
      },
      remove: async (id) => {
        const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
          method: 'DELETE',
          headers: buildHeaders(),
        });
        return handleResponse(response);
      },
    },
    
    // Admin - Categories CRUD
    categories: {
      list: async (params = {}) => {
        const queryParams = new URLSearchParams();
        Object.keys(params).forEach(key => {
          if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
            queryParams.append(key, params[key]);
          }
        });
        const response = await fetch(`${API_BASE_URL}/admin/categories?${queryParams}`, {
          headers: buildHeaders(),
        });
        return handleResponse(response);
      },
      create: async (payload) => {
        const response = await fetch(`${API_BASE_URL}/admin/categories`, {
          method: 'POST',
          headers: buildHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(payload),
        });
        return handleResponse(response);
      },
      update: async (id, payload) => {
        const response = await fetch(`${API_BASE_URL}/admin/categories/${id}`, {
          method: 'PUT',
          headers: buildHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(payload),
        });
        return handleResponse(response);
      },
      remove: async (id) => {
        const response = await fetch(`${API_BASE_URL}/admin/categories/${id}`, {
          method: 'DELETE',
          headers: buildHeaders(),
        });
        return handleResponse(response);
      },
    },
    
    // Admin - Users CRUD
    users: {
      list: async (params = {}) => {
        const queryParams = new URLSearchParams();
        Object.keys(params).forEach(key => {
          if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
            queryParams.append(key, params[key]);
          }
        });
        const response = await fetch(`${API_BASE_URL}/admin/users?${queryParams}`, {
          headers: buildHeaders(),
        });
        return handleResponse(response);
      },
      create: async (payload) => {
        const response = await fetch(`${API_BASE_URL}/admin/users`, {
          method: 'POST',
          headers: buildHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(payload),
        });
        return handleResponse(response);
      },
      update: async (id, payload) => {
        const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
          method: 'PUT',
          headers: buildHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(payload),
        });
        return handleResponse(response);
      },
      remove: async (id) => {
        const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
          method: 'DELETE',
          headers: buildHeaders(),
        });
        return handleResponse(response);
      },
    },
    
    // Admin - Roles CRUD
    roles: {
      list: async () => {
        const response = await fetch(`${API_BASE_URL}/admin/roles`, {
          headers: buildHeaders(),
        });
        return handleResponse(response);
      },
      create: async (payload) => {
        const response = await fetch(`${API_BASE_URL}/admin/roles`, {
          method: 'POST',
          headers: buildHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(payload),
        });
        return handleResponse(response);
      },
      update: async (id, payload) => {
        const response = await fetch(`${API_BASE_URL}/admin/roles/${id}`, {
          method: 'PUT',
          headers: buildHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(payload),
        });
        return handleResponse(response);
      },
      remove: async (id) => {
        const response = await fetch(`${API_BASE_URL}/admin/roles/${id}`, {
          method: 'DELETE',
          headers: buildHeaders(),
        });
        return handleResponse(response);
      },
    },

    // Admin - Orders CRUD
    orders: {
      list: async (params = {}) => {
        const queryParams = new URLSearchParams();
        Object.keys(params).forEach(key => {
          if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
            queryParams.append(key, params[key]);
          }
        });
        const response = await fetch(`${API_BASE_URL}/admin/orders?${queryParams}`, {
          headers: buildHeaders(),
        });
        return handleResponse(response);
      },
      getById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/admin/orders/${id}`, {
          headers: buildHeaders(),
        });
        return handleResponse(response);
      },
      updateStatus: async (id, payload) => {
        const response = await fetch(`${API_BASE_URL}/admin/orders/${id}/status`, {
          method: 'PUT',
          headers: buildHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(payload),
        });
        return handleResponse(response);
      },
    },

    // Admin - Blog CRUD
    blog: {
      list: async (params = {}) => {
        const queryParams = new URLSearchParams();
        Object.keys(params).forEach(key => {
          if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
            queryParams.append(key, params[key]);
          }
        });
        const response = await fetch(`${API_BASE_URL}/admin/blog?${queryParams}`, {
          headers: buildHeaders(),
        });
        return handleResponse(response);
      },
      create: async (payload) => {
        const response = await fetch(`${API_BASE_URL}/admin/blog`, {
          method: 'POST',
          headers: buildHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(payload),
        });
        return handleResponse(response);
      },
      update: async (id, payload) => {
        const response = await fetch(`${API_BASE_URL}/admin/blog/${id}`, {
          method: 'PUT',
          headers: buildHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(payload),
        });
        return handleResponse(response);
      },
      remove: async (id) => {
        const response = await fetch(`${API_BASE_URL}/admin/blog/${id}`, {
          method: 'DELETE',
          headers: buildHeaders(),
        });
        return handleResponse(response);
      },
    },

    // Admin - Upload
    upload: {
      image: async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        
        const response = await fetch(`${API_BASE_URL}/upload/image`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken}`
            // Không set Content-Type cho FormData
          },
          body: formData
        });
        return handleResponse(response);
      },
    },

    // Admin - Dashboard
    dashboard: {
      stats: async () => {
        const response = await fetch(`${API_BASE_URL}/dashboard`, {
          headers: buildHeaders(),
        });
        return handleResponse(response);
      },
    },
  }
};

export default api;
