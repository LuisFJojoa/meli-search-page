import { ICustomizedErrors } from '../backend/errors'
import { IItemFromQueryParams } from '../backend/items'

interface IErrors {
	items: ICustomizedErrors
}
export interface SearchStoreValues {
	items: IItemFromQueryParams[]
	loading: boolean
	errors?: IErrors
}

export interface SearchStoreActions {
	getAllItems: (searchQuery: string) => void
	setLoading: (value: boolean) => void
	clearErrors: () => void
	setError: (key: string, value: string) => void
}

export interface SearchStoreState
	extends SearchStoreValues,
		SearchStoreActions {}
