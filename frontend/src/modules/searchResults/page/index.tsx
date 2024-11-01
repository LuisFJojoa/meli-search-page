import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSearchStore } from '@/store/items'
import { Item } from '../components/item'

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
			{itemsByQueryParams.items?.map((item) => <Item info={item} />)}
		</section>
	)
}
