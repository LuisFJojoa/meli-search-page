import { formattedDecimal, formattedNumberWithUnits } from '@/utils'
import { ItemDetailsProps } from '../interfaces'
import './itemDetails.scss'

export const ItemDetails = ({ details }: ItemDetailsProps) => {
	const { title, condition, sold_quantity, price, description, picture } =
		details
	return (
		<article className='item-details'>
			<section className='item-details__info-container__header'>
				<section className='item-details__info-container__header__image-container'>
					<img
						src={picture}
						alt='image-icon'
						className='item-details__info-container__header__image-container__image'
					/>
				</section>
				<section className='item-details__info-container__header__details'>
					<p className='item-details__info-container__header__details__sold-quantity'>
						{condition === 'new' ? 'Nuevo - ' : ''} {sold_quantity}{' '}
						vendidos
					</p>
					<p className='item-details__info-container__header__details__title'>
						{title}
					</p>
					<p className='item-details__info-container__header__details__price'>
						$ {formattedNumberWithUnits(price?.amount as number)}
						<sup>{formattedDecimal(price?.decimals as number)}</sup>
					</p>
					<section className='item-details__info-container__header__details__action'>
						<button type='button'>Comprar</button>
					</section>
				</section>
			</section>
			<section className='item-details__info-container__description'>
				<h2 className='item-details__info-container__description__title'>
					Descripción del producto
				</h2>
				<p className='item-details__info-container__description__value'>
					{description}
				</p>
			</section>
		</article>
	)
}
