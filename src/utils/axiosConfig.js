// src/config/axiosConfig.js
import axios from 'axios';

// ✅ اضبطي الرابط الأساسي
axios.defaults.baseURL = 'http://127.0.0.1:8000';

// ✅ أرسلي الكوكيز تلقائيًا
axios.defaults.withCredentials = true;

// ✅ أرسلي XSRF-TOKEN تلقائيًا في كل الطلبات
axios.interceptors.request.use((config) => {
  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  };

  const csrfToken = getCookie('XSRF-TOKEN');
  if (csrfToken) {
    config.headers['X-XSRF-TOKEN'] = csrfToken;
  }

  return config;
}, (error) => Promise.reject(error));

export default axios;
