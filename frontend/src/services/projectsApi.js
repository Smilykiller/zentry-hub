import api from './api'

export const projectsApi = {
  getAll:    (params) => api.get('/projects', { params }),
  getById:   (id)     => api.get(`/projects/${id}`),
  create:    (data)   => api.post('/projects', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update:    (id, d)  => api.put(`/projects/${id}`, d),
  remove:    (id)     => api.delete(`/projects/${id}`),
}
