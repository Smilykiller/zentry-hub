import api from './api'

export const testimonialsApi = {
  getApproved: ()    => api.get('/testimonials'),
  getPending:  ()    => api.get('/testimonials/pending'),
  submit:      (d)   => api.post('/testimonials', d),
  approve:     (id)  => api.put(`/testimonials/${id}/approve`),
  remove:      (id)  => api.delete(`/testimonials/${id}`),
}
