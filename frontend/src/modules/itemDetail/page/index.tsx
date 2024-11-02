import { useSearchStore } from '@/store/items'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ItemDetails } from '../components/itemDetails'
import { Loading } from '@/components/loading'
import { moveScrollTo } from '@/utils'
import { NotFound } from '@/components/notFound'

export const ItemDetail = () => {
	const { id } = useParams()
	const { item, loading, errors, getItemDetails } = useSearchStore()
	useEffect(() => {
		if (id) {
			getItemDetails(id)
			moveScrollTo()
		}
	}, [id, getItemDetails])

	if (loading) return <Loading />
	if (errors?.items) return <NotFound/>

	return <ItemDetails details={{ ...item }} />
}
