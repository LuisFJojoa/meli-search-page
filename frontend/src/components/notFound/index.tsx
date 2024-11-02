import notFoundImage from '@/assets/icons/not_found.png'
import './notFound.scss'
import { Link } from 'react-router-dom'

interface NotFoundProps {
	isCustomSize?: boolean
}
export const NotFound = ({ isCustomSize = false }: NotFoundProps) => {
	return (
		<section
			className={`not-found ${isCustomSize ? 'not-found__custom-sizes' : ''}`}>
			<section className='not-found__logo-container'>
				<img
					src={notFoundImage}
					alt='logo-icon'
					className='not-found__logo-container__logo'
				/>
			</section>
			<p className='not-found__description'>
				Hubo un problema y no encontramos lo que estabas buscando.
			</p>
			<p className='not-found__description'>
				¿Qué tal si volvemos al <Link to={'/'}>inicio</Link> y lo
				intentamos de nuevo?
			</p>
		</section>
	)
}
