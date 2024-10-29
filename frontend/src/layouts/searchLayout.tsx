import { Outlet } from 'react-router-dom'

export const SearchLayout = () => (
	<div>
		<header>
			<h1>My Header</h1>
		</header>
		<main>
			<Outlet />
		</main>
	</div>
)
