import { Header } from '@/components/header'
import { Outlet } from 'react-router-dom'
import './mainLayout.scss'
import { Breadcrumb } from '@/components/breadcrumb'

export const MainLayout = () => (
	<div>
		<Header />
		<main className='main-layout'>
			<Breadcrumb />
			<Outlet />
		</main>
	</div>
)
