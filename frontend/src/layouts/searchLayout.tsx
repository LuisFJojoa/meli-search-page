import { Header } from '@/components/header'
import { Outlet } from 'react-router-dom'
import './searchLayout.scss'
import { Breadcrumb } from '@/components/breadcrumb'

export const SearchLayout = () => (
	<div>
		<Header />
		<main className='main-layout'>
			<Breadcrumb />
			<section className='main-layout__container'>
				<Outlet />
			</section>
		</main>
	</div>
)
