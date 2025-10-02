import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL || 'http://192.168.15.150:8080',
  timeout: 10000,
});

export const MotoAPI = {
  list: () => api.get('/motos/all'),
  getById: (id: string) => api.get(`/motos/${id}`),
  create: (payload: { plate: string; model: string; status: string; yardSlot: string }) =>
    api.post('/motos', payload),
  update: (id: string, payload: Partial<{ plate: string; model: string; status: string; yardSlot: string }>) =>
    api.put(`/motos/${id}`, payload),
  remove: (id: string) => api.delete(`/motos/${id}`),
};

export const AuthAPI = {
  register: (payload: { name: string; email: string; password: string }) =>
    api.post('/auth/register', payload),

  login: (payload: { email: string; password: string }) =>
    api.post('/auth/login', payload),
};