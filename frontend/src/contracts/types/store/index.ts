import { IAuthor } from '../backend/author/main'
import { ICustomizedErrors } from '../backend/errors'
import { IItemDetail, IItemFromQueryParams } from '../backend/items'

interface IErrors {
	items?: ICustomizedErrors
	item?: ICustomizedErrors
	signature?: IAuthor
}
export interface SearchStoreValues {
	items: IItemFromQueryParams[]
	item: IItemDetail
	signature: IAuthor
	loading: boolean
	errors?: IErrors

}

export interface SearchStoreActions {
	getItemDetails: (itemId: string) => void
	getAllItems: (searchQuery: string) => void
	setLoading: (value: boolean) => void
	clearErrors: () => void
	setError: (key: string, value: string) => void
}

export interface SearchStoreState
	extends SearchStoreValues,
		SearchStoreActions {}
