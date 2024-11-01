import { useSearchStore } from '@/store/items'

export const Breadcrumb = () => {
	const { categories } = useSearchStore()
	return (
		<h1 className='main-layout__breadcrumb'>
			{ categories && categories?.join(' > ')}
		</h1>
	)
}
