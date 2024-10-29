import { API_BASE_URL } from '../env'

export const API_ENDPOINTS = Object.freeze({
	ITEM: {
		GET_ALL: (query: string) => `${API_BASE_URL}/items?q=${query}`,
		GET_DETAIL: (id: string) => `${API_BASE_URL}/items/${id}`
	}
})