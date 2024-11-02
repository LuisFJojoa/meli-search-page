import { Loading } from '@/components/loading'
import { ReactElement, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const ItemLayout = lazy(() =>
	import('@/layouts/item/itemLayout').then((module) => ({
		default: module.ItemLayout
	}))
)
const MainLayout = lazy(() =>
	import('@/layouts/main/mainLayout').then((module) => ({
		default: module.MainLayout
	}))
)
const ItemDetail = lazy(() =>
	import('@/modules/itemDetail/page').then((module) => ({
		default: module.ItemDetail
	}))
)
const SearchResults = lazy(() =>
	import('@/modules/searchResults/page').then((module) => ({
		default: module.SearchResults
	}))
)

export default function AppRoutes(): ReactElement {
	return (
		<Router>
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route path='*' element={<>Page not found</>} />
					<Route path='/' element={<MainLayout />}>
						<Route path='' element={<>Home</>} index />
						<Route path='items' element={<ItemLayout />}>
							<Route element={<SearchResults />} index />
							<Route element={<ItemDetail />} path=':id' />
						</Route>
					</Route>
				</Routes>
			</Suspense>
		</Router>
	)
}
