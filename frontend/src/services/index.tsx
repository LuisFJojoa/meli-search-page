import { axiosInstance } from '@/config/axios'
import { API_ENDPOINTS } from '@/consts/endpoints/intdex'
import { AxiosInstance } from 'axios'

export default class ItemsRepository {
	private http: AxiosInstance
	constructor() {
		this.http = axiosInstance
	}

	async getItemsByQueryParam(query: string) {
		const url = API_ENDPOINTS.ITEM.GET_ALL(query)
		const result = await this.http.get(url)
		return result.data
	}

	async getItemDetails(id: string) {
		const url = API_ENDPOINTS.ITEM.GET_DETAIL(id)
		const result = await this.http.get(url)
		return result.data
	}
}
