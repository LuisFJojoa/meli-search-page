import { ReactElement } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export default function AppRoutes(): ReactElement {
	return (
		<Router>
			<Routes>
      <Route path="*" element={<>Page not found</>} />
				<Route path='/' element={<>Home</>} />
				<Route path='/items'>
        <Route element={<>items</>} index/>
					<Route
						element={<>item details</>}
						path=':id'
					/>
				</Route>
			</Routes>
		</Router>
	)
}
