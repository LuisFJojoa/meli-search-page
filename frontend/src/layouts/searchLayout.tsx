import { Header } from '@/components/header'
import { Outlet } from 'react-router-dom'
import './searchLayout.scss'
import { Breadcrumb } from '@/components/breadcrumb'

export const SearchLayout = () => (
	<div>
		<Header />
		<main className='main-layout'>
			<Breadcrumb />
			<Outlet />
		</main>
	</div>
)
