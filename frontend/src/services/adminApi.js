import api from './api'

export const adminApi = {
  login:    (creds) => api.post('/auth/login', creds),
  logout:   ()      => api.post('/auth/logout'),
  me:       ()      => api.get('/auth/me'),
  getLeads: ()      => api.get('/leads'),
  markRead: (id)    => api.put(`/leads/${id}/read`),
}
