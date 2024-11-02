import { useSearchStore } from '@/store/items'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ItemDetails } from '../components/itemDetails'
import { Loading } from '@/components/loading'

export const ItemDetail = () => {
	const { id } = useParams()
	const { item, loading, errors, getItemDetails } = useSearchStore()
	useEffect(() => {
		if (id) {
			getItemDetails(id)
		}
	}, [id, getItemDetails])

	if (loading) return <Loading />
	if (errors?.items) return <div>Error: {errors.items.message}</div>

	return <ItemDetails details={{ ...item }} />
}
