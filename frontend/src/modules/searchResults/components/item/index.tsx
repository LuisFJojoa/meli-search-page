import { formattedNumber } from '@/services'
import { ItemProps } from '../../interfaces'
import './item.scss'
import freeShippingIcon from '@/assets/icons/ic_shipping.png'

export const Item = ({ info, navigateToItemDetails }: ItemProps) => {
	const { id, title, price, free_shipping, picture } = info
	return (
		<article className='item' onClick={() => navigateToItemDetails(id as string)}>
			<section className='item__image-container'>
				<img
					src={picture}
					alt='image-icon'
					className='item__image-container__image'
				/>
			</section>
			<section className='item__info-container'>
				<section className='item__info-container__header'>
					<section className='item__info-container__header__detail'>
						<p className='item__info-container__header__detail__price'>
							$ {formattedNumber(price?.amount || 0)}
						</p>
						{free_shipping && (
							<img
								src={freeShippingIcon}
								alt='searh-icon'
								className='item__info-container__header__detail__icon'
							/>
						)}
					</section>
					<section className='item__info-container__header__city'>
						<p className='item__info-container__header__city__value'>
							Mendoza
						</p>
					</section>
				</section>
				<section className='item__info-container__description'>
					<p className='item__info-container__description__value'>
						{title}
					</p>
				</section>
			</section>
		</article>
	)
}
