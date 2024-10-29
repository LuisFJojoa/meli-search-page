import { useLocation } from 'react-router-dom'

export const SearchResults = () => {
	const location = useLocation()
	const queryParams = new URLSearchParams(location.search)
	const searchQuery = queryParams.get('search')

	return <p>Resultados para: {searchQuery}</p>
}
