import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL || 'https://localhost:8080/api',
  timeout: 10000,
});

// Exemplo de rotas (usar depois)
// export const MotorcycleAPI = {
//   list: () => api.get('/motos'),
//   create: (payload: any) => api.post('/motos', payload),
//   update: (id: string, payload: any) => api.put(`/motos/${id}`, payload),
//   remove: (id: string) => api.delete(`/motos/${id}`),
// };