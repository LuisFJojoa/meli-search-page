import { Header } from '@/components/header'
import { Outlet } from 'react-router-dom'

export const SearchLayout = () => (
	<div>
		<Header />
		<main>
			<Outlet />
		</main>
	</div>
)
