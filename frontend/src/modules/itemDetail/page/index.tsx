import { useParams } from 'react-router-dom'

export const ItemDetail = () => {
	const { id } = useParams()

	return <p>Detalle del Producto con ID: {id}</p>
}
