import { IAuthor } from '../backend/author/main'
import { ICustomizedErrors } from '../backend/errors'
import { IItemDetail, IItemFromQueryParams } from '../backend/items'

interface IErrors {
	categories?: ICustomizedErrors
	items?: ICustomizedErrors
	item?: ICustomizedErrors
	signature?: ICustomizedErrors
}
export interface SearchStoreValues {
	items: Partial<IItemFromQueryParams>[]
	item: IItemDetail
	categories?: Array<string>
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
