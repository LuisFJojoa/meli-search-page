import { ItemDetailsProps } from '../interfaces'

export const ItemDetails = ({ details }: ItemDetailsProps) => {
	const { title, condition, sold_quantity, price, description, picture } =
		details
	return (
		<article className='item-details'>
			<aside className='item-details__info-container'>
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
							{condition} - {sold_quantity} vendidos
						</p>
						<p className='item-details__info-container__header__details__title'>
							{title}
						</p>
						<p className='item-details__info-container__header__details__price'>
							$ {price?.amount} {price?.decimals}
						</p>
						<section className='item-details__info-container__header__details__action'>
							<button type='button'>Comprar</button>
						</section>
					</section>
				</section>
			</aside>
			<section className='item-details__info-container__description'>
				<p className='item-details__info-container__description__value'>
					{description}
				</p>
			</section>
		</article>
	)
}
