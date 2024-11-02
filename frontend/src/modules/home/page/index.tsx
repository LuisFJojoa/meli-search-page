import homePageImage from '@/assets/icons/home_icon.png'
import './homepage.scss'
export const HomePage = () => {
	return (
		<section className='homepage'>
			<section className='homepage__logo-container'>
				<img
					src={homePageImage}
					alt='logo-icon'
					className='homepage__logo-container__logo'
				/>
			</section>
			<p className='homepage__description'>¿Aún no sabes qué comprar? Intenta escribiendo tu palabra favorita.</p>
		</section>
	)
}
