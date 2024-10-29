import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ItemsRepository from '../services'

export const SearchResults = () => {
	const location = useLocation()
	const queryParams = new URLSearchParams(location.search)
	const searchQuery = queryParams.get('search')

	const [items, setItems] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const itemsRepository = new ItemsRepository() // Crea una instancia del repositorio

	useEffect(() => {
		const fetchItems = async () => {
			try {
				setLoading(true)
				const result =
					await itemsRepository.getItemsByQueryParam(searchQuery)
				console.log(result.data.items)

				setItems(result.data.items) // Guarda los resultados en el estado
			} catch (err) {
				setError(err.message) // Maneja el error
			} finally {
				setLoading(false) // Finaliza el estado de carga
			}
		}

		if (searchQuery) {
			fetchItems()
		}
	}, [searchQuery]) // Dependencia en searchQuery para volver a ejecutar el efecto si cambia

	// Manejo de errores y loading
	if (loading) return <div>Cargando...</div>
	if (error) return <div>Error: {error}</div>

	return (
		<div>
			<h2>Resultados para: {searchQuery}</h2>
			<ul>
				{items.map((item) => (
					<li key={item.id}>{item.title}</li> // Cambia las propiedades según tu estructura de datos
				))}
			</ul>
		</div>
	)
}
