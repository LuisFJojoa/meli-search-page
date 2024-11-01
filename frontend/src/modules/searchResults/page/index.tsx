import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSearchStore } from '@/store/items'

export const SearchResults = () => {
	const location = useLocation()
	const queryParams = new URLSearchParams(location.search)
	const searchQuery = queryParams.get('search')

	const { itemsByQueryParams, loading, errors, getAllItems } =
		useSearchStore()

	useEffect(() => {
		if (searchQuery) {
			getAllItems(searchQuery as string)
		}
	}, [searchQuery, getAllItems])

	if (loading) return <div>Cargando...</div>
	if (errors?.itemsByQueryParams)
		return <div>Error: {errors.itemsByQueryParams.message}</div>

	return (
		<section>
			<h1>{itemsByQueryParams.categories}</h1>
			<ul>
				{itemsByQueryParams.items?.map((item) => (
					<>
						<li key={item.id}>{item.title}</li>
						<li key={item.id}>{item.price.amount}</li>
						<li key={item.id}>{item.free_shipping ? 'true': 'false'}</li>
					</>
				))}
			</ul>
		</section>
	)
}
