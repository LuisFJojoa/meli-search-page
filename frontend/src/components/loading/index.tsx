import { RotatingLines } from 'react-loader-spinner'

export const Loading = () => {
	return (
		<RotatingLines
      strokeColor="#666666"
      strokeWidth="5"
      animationDuration="0.75"
      width="96"
      visible={true}
    />
	)
}

