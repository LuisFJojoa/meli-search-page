import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSearchStore } from '@/store/items'
import { Item } from '../components/item'
import './searchResultPage.scss'
import { NAVIGATION_PATHS } from '@/consts/endpoints/intdex'

export const SearchResults = () => {
	const location = useLocation()
	const queryParams = new URLSearchParams(location.search)
	const searchQuery = queryParams.get('search')

	const { itemsByQueryParams, loading, errors, getAllItems } =
		useSearchStore()

	const navigate = useNavigate()

	useEffect(() => {
		if (searchQuery) {
			getAllItems(searchQuery as string)
		}
	}, [searchQuery, getAllItems])

	const handleItemDatailsNavigation = (itemId: string) => {
		navigate(NAVIGATION_PATHS.ITEM.GET_DETAIL(itemId))
	}

	if (loading) return <div>Cargando...</div>
	if (errors?.itemsByQueryParams)
		return <div>Error: {errors.itemsByQueryParams.message}</div>

	return (
		
			<section className='main-layout__container'>
				{itemsByQueryParams.items?.map((item) => (
					<Item
						key={item.id}
						info={item}
						navigateToItemDetails={handleItemDatailsNavigation}
					/>
				))}
			</section>
	)
}
