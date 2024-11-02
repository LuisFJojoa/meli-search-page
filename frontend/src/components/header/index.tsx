import React, { useEffect, useState } from 'react'
import searchIcon from '@/assets/icons/ic_Search.png'
import logoIcon from '@/assets/icons/Logo_ML.png'
import './header.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { NAVIGATION_PATHS } from '@/consts/endpoints/intdex'

export const Header = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const { pathname } = useLocation()

	useEffect(() => {
		if (pathname === '/') {
			setSearchTerm('')
		}
	}, [pathname])

	const navigate = useNavigate()

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target
		setSearchTerm(value)
	}

	const handleSearch = () => {
		if (searchTerm !== '') {
			navigate(NAVIGATION_PATHS.ITEM.GET_ALL(searchTerm))
		} else {
			console.log('No se ha escrito nada')
		}
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleSearch()
		}
	}

	const handleHomeRedirect = () => {
		navigate('/')
	}

	return (
		<header className='header'>
			<section className='header__content'>
				<section className='header__content__logo-container'>
					<img
						src={logoIcon}
						alt='logo-icon'
						className='header__content__logo-container__logo'
						onClick={handleHomeRedirect}
					/>
				</section>
				<section className='header__content__search-container'>
					<input
						type='text'
						value={searchTerm}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
						placeholder='Nunca dejes de buscar...'
						className='header__content__search-container__input'
					/>
					<section
						className='header__content__search-container__icon-container'
						onClick={handleSearch}>
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
