import { axiosInstance } from '@/config/axios'
import { API_ENDPOINTS } from '@/consts/endpoints/intdex'
import {
	IItemDetailsByIdResponse,
	IItemsByQueryParamsResponse
} from '@/contracts/types/backend/items'
import { AxiosInstance } from 'axios'

export default class ItemsRepository {
	private http: AxiosInstance
	constructor() {
		this.http = axiosInstance
	}

	async getItemsByQueryParam(
		query: string
	): Promise<IItemsByQueryParamsResponse> {
		const url = API_ENDPOINTS.ITEM.GET_ALL(query)
		const result = await this.http.get(url)
		return result.data.data
	}

	async getItemDetails(id: string): Promise<IItemDetailsByIdResponse> {
		const url = API_ENDPOINTS.ITEM.GET_DETAIL(id)
		const result = await this.http.get(url)
		return result.data.data
	}
}
