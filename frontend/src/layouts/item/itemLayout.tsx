import { Outlet } from 'react-router-dom'
import './itemLayout.scss'

export const ItemLayout = () => {
	return (
		<section className='main-layout__container'>
			<Outlet />
		</section>
	)
}
