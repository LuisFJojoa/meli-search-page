import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSearchStore } from '@/store/items'
import { Item } from '../components/item'
import { NAVIGATION_PATHS } from '@/consts/endpoints/intdex'
import { Loading } from '@/components/loading'
import { NotFound } from '@/components/notFound'
import { moveScrollTo } from '@/utils'

export const SearchResults = () => {
	const location = useLocation()
	const queryParams = new URLSearchParams(location.search)
	const searchQuery = queryParams.get('search')

	const { items, loading, errors, getAllItems } = useSearchStore()

	const navigate = useNavigate()

	useEffect(() => {
		if (searchQuery) {
			getAllItems(searchQuery as string)
			moveScrollTo()
		}
	}, [searchQuery, getAllItems])

	const handleItemDatailsNavigation = (itemId: string) => {
		navigate(NAVIGATION_PATHS.ITEM.GET_DETAIL(itemId))
	}

	if (loading) return <Loading/>
	if (errors?.items) return <NotFound/>

	return (
		<section className='main-layout__container__items'>
			{items?.map((item) => (
				<Item
					key={item.id}
					info={item}
					navigateToItemDetails={handleItemDatailsNavigation}
				/>
			))}
		</section>
	)
}
