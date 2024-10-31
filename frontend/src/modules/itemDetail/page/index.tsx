import { useSearchStore } from '@/store/items'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const ItemDetail = () => {
	const { id } = useParams()
	const { item, loading, errors, getItemDetails } = useSearchStore()
	useEffect(() => {
		if (id) {
			getItemDetails(id)
		}
	}, [id, getItemDetails])

	if (loading) return <div>Cargando...</div>
	if (errors?.items) return <div>Error: {errors.items.message}</div>

	return (
		<div>
			<h2>Resultados para item con id: {id}</h2>
			<p>{item.id}</p>
			<p>{item.title}</p>
			<img src={item.picture} alt='' />
			<p>{item.description}</p>
		</div>
	)
}
