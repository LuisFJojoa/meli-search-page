import { Header } from '@/components/header'
import { Outlet } from 'react-router-dom'
import './searchLayout.scss'

export const SearchLayout = () => (
	<div>
		<Header />
		<main className='main-layout'>
			<Outlet />
		</main>
	</div>
)
