import React, { useState } from 'react'
import searchIcon from '@/assets/icons/ic_Search.png'
import logoIcon from '@/assets/icons/Logo_ML.png'
import './header.scss'

export const Header = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value)
	}

	return (
		<header className='header'>
			<section className='header__content'>
				<section className='header__content__logo-container'>
					<img
						src={logoIcon}
						alt='logo-icon'
						className='header__content__logo-container__logo'
					/>
				</section>
				<section className='header__content__search-container'>
					<input
						type='text'
						value={searchTerm}
						onChange={handleInputChange}
						placeholder='Nunca dejes de buscar...'
						className='header__content__search-container__input'
					/>
					<section className='header__content__search-container__icon-container'>
						<img
							src={searchIcon}
							alt='searh-icon'
							className='header__content__search-container__icon-container__icon'
						/>
					</section>
				</section>
			</section>
		</header>
	)
}
