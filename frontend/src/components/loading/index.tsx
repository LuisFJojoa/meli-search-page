import { RotatingLines } from 'react-loader-spinner'
import './loading.scss'
export const Loading = () => {
	return (
		<section className='loading-container'>
			<RotatingLines
				strokeColor='#666666'
				strokeWidth='5'
				animationDuration='0.75'
				width='96'
				visible={true}
			/>
		</section>
	)
}
