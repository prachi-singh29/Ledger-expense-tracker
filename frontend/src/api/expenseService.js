import apiClient from './client'

const RESOURCE = '/api/expenses'

export const expenseService = {
  getAll: async () => (await apiClient.get(RESOURCE)).data,
  getSummary: async () => (await apiClient.get(`${RESOURCE}/summary`)).data,
  getById: async (id) => (await apiClient.get(`${RESOURCE}/${id}`)).data,
  create: async (payload) => (await apiClient.post(RESOURCE, payload)).data,
  update: async (id, payload) => (await apiClient.put(`${RESOURCE}/${id}`, payload)).data,
  remove: async (id) => (await apiClient.delete(`${RESOURCE}/${id}`)).data,
}
