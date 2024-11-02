import notFoundImage from '@/assets/icons/not_found.png'
import './notFound.scss'
import { Link } from 'react-router-dom'
export const NotFound = () => {
	return (
		<section className='not-found'>
			<section className='not-found__logo-container'>
				<img
					src={notFoundImage}
					alt='logo-icon'
					className='not-found__logo-container__logo'
				/>
			</section>
			<p className='not-found__description'>
				Hubo un problema y no encontramos la página que buscas.
			</p>
			<p className='not-found__description'>
				¿Qué tal si volvemos al <Link to={'/'}>inicio</Link> y lo
				intentamos de nuevo?
			</p>
		</section>
	)
}
