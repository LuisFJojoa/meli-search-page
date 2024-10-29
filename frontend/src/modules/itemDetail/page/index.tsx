import {
	IItemDetail,
	IItemDetailsByIdResponse
} from '@/contracts/types/backend/items'
import ItemsRepository from '@/services'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const ItemDetail = () => {
	const { id } = useParams()

	const [item, setItems] = useState<IItemDetail>({} as IItemDetail)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const itemsRepository = new ItemsRepository()

	useEffect(() => {
		const fetchItemDetails = async () => {
			try {
				setLoading(true)
				const result: IItemDetailsByIdResponse =
					await itemsRepository.getItemDetails(id as string)

				setItems(result.item)
			} catch (err) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		if (id) {
			fetchItemDetails()
		}
	}, [id])

	if (loading) return <div>Cargando...</div>
	if (error) return <div>Error: {error}</div>

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
