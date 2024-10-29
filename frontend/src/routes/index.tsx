import { SearchLayout } from '@/layouts/searchLayout'
import { SearchResults } from '@/modules/searchResults/page'
import { ReactElement } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export default function AppRoutes(): ReactElement {
	return (
		<Router>
			<Routes>
				<Route path='*' element={<>Page not found</>} />
				<Route path='/' element={<SearchLayout />}>
					<Route path='' element={<>Home</>} index />
					<Route path='items'>
						<Route element={<SearchResults />} index />
						<Route element={<>item details</>} path=':id' />
					</Route>
				</Route>
			</Routes>
		</Router>
	)
}
