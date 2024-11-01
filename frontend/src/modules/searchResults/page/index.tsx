import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSearchStore } from '@/store/items'
import { Item } from '../components/item'
import './searchResultPage.scss'

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
		<section className='search-results-page'>
			<h1 className='search-results-page__breadcrumb'>{itemsByQueryParams.categories}</h1>
			<section className='search-results-page__container'>
				{itemsByQueryParams.items?.map((item) => <Item info={item} />)}
			</section>
		</section>
	)
}
