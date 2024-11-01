import React, { useState } from 'react'
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
				<input
					type='text'
					value={searchTerm}
					onChange={handleInputChange}
					placeholder='Nunca dejes de buscar'
					className='header__content__search-input'
				/>
			</section>
		</header>
	)
}
