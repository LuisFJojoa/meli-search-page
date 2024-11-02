import { NotFound } from '@/components/notFound'
import { ItemLayout } from '@/layouts/item/itemLayout'
import { MainLayout } from '@/layouts/main/mainLayout'
import { HomePage } from '@/modules/home/page'
import { ItemDetail } from '@/modules/itemDetail/page'
import { SearchResults } from '@/modules/searchResults/page'
import { ReactElement } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export default function AppRoutes(): ReactElement {
	return (
		<Router>
				<Routes>
					<Route path='*' element={<NotFound isCustomSize={true}/>} />
					<Route path='/' element={<MainLayout />}>
						<Route path='' element={<HomePage />} index />
						<Route path='items' element={<ItemLayout />}>
							<Route element={<SearchResults />} index />
							<Route element={<ItemDetail />} path=':id' />
						</Route>
					</Route>
				</Routes>
		</Router>
	)
}
