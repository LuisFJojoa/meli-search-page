import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSearchStore } from '@/store/items'

export const SearchResults = () => {
	const location = useLocation()
	const queryParams = new URLSearchParams(location.search)
	const searchQuery = queryParams.get('search')

	const { items, loading, errors, getAllItems } = useSearchStore()

	useEffect(() => {
		if (searchQuery) {
			getAllItems(searchQuery as string)
		}
	}, [searchQuery, getAllItems])

	if (loading) return <div>Cargando...</div>
	if (errors?.items) return <div>Error: {errors.items.message}</div>

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
