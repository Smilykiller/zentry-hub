import api from './api'

export const contactApi = {
  submit: (data) => api.post('/contact', data),
}
