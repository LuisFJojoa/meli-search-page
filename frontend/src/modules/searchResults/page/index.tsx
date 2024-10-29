import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ItemsRepository from '../../../services'
import {
	IItemFromQueryParams,
	IItemsByQueryParamsResponse
} from '@/contracts/types/backend/items'

export const SearchResults = () => {
	const location = useLocation()
	const queryParams = new URLSearchParams(location.search)
	const searchQuery = queryParams.get('search')

	const [items, setItems] = useState<IItemFromQueryParams[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const itemsRepository = new ItemsRepository()

	useEffect(() => {
		const fetchItems = async () => {
			try {
				setLoading(true)
				const result: IItemsByQueryParamsResponse =
					await itemsRepository.getItemsByQueryParam(
						searchQuery as string
					)

				setItems(result.items)
			} catch (err) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		if (searchQuery) {
			fetchItems()
		}
	}, [searchQuery])

	if (loading) return <div>Cargando...</div>
	if (error) return <div>Error: {error}</div>

	return (
		<div>
			<h2>Resultados para: {searchQuery}</h2>
			<ul>
				{items.map((item) => (
					<li key={item.id}>{item.title}</li>
				))}
			</ul>
		</div>
	)
}
