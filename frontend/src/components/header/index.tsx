import React, { useState } from 'react'
import searchIcon from '@/assets/icons/ic_Search.png'
import './header.scss'

export const Header = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value)
	}

	return (
		<header className='header'>
			<section className='header__content'>
				<h1 className='header__content__title'>Mi Aplicación</h1>
				<div className='header__content__search-container'>
					<input
						type='text'
						value={searchTerm}
						onChange={handleInputChange}
						placeholder='Nunca dejes de buscar...'
						className='header__content__search-container__input'
					/>
					<div className='header__content__search-container__icon-container'>
						<img
							src={searchIcon}
							alt='searh-icon'
							className='header__content__search-container__icon-container__icon'
						/>
					</div>
				</div>
			</section>
		</header>
	)
}
