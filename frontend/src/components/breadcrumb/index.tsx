export const Breadcrumb = () => {
	return (
		<h1 className='main-layout__breadcrumb'>
			{['Categoria 1', 'Categoria 2']?.join(' > ')}
		</h1>
	)
}
