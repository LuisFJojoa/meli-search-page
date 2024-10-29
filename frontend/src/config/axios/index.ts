import axios, { AxiosInstance } from 'axios'

export const axiosInstance: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	headers: {
		'Content-type': 'application/json'
	}
})
