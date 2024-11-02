import { IAuthor } from '@/contracts/types/backend/author/main'
import { ICustomizedErrors } from '@/contracts/types/backend/errors'
import { IItemDetail, IItemDetailsByIdResponse, IItemFromQueryParams, IItemsByQueryParamsResponse } from '@/contracts/types/backend/items'
import { SearchStoreState, SearchStoreValues } from '@/contracts/types/store'
import ItemsRepository from '@/services'
import { isAxiosError } from 'axios'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

export const initialState: SearchStoreValues = {
	items: [] as IItemFromQueryParams[],
	item: {} as IItemDetail,
	signature: { name: 'Undefined', lastname: 'Undefined' } as IAuthor,
	loading: false,
	errors: undefined
}

export const useSearchStore = create<SearchStoreState>()(
	devtools(
		persist(
			(set) => ({
				...initialState,
				getAllItems: async (searchQuery: string) => {
					try {
						set({ loading: true, errors: undefined, categories: [] })
						const itemsRepository = new ItemsRepository()
						const result: IItemsByQueryParamsResponse =
							await itemsRepository.getItemsByQueryParam(
								searchQuery
							)

						set((state) => ({
							...state,
							categories: result.categories,
							items: result.items,
							signature: result.author,
							loading: false
						}))
					} catch (error) {

						if (isAxiosError(error)) {
							const errorContent = error.response?.data as ICustomizedErrors

							set((state) => ({
								...state,
								loading: false,

								errors: {
									...state.errors,
									items: errorContent
								}
							}))
						}
					}
				},
				getItemDetails: async (itemId: string) => {
					try {
						set({ loading: true, errors: undefined })
						const itemsRepository = new ItemsRepository()
						const result: IItemDetailsByIdResponse =
							await itemsRepository.getItemDetails(itemId)

						set((state) => (
							{
								...state,
								categories: Array.from(new Set([...(state.categories || []), ...(result?.item?.categories || [])])),
								item: result.item,
								signature: result.author,
								loading: false
							}))
					} catch (error) {

						if (isAxiosError(error)) {
							const errorContent = error.response?.data as ICustomizedErrors

							set((state) => ({
								...state,
								loading: false,
								errors: {
									...state.errors,
									item: errorContent
								}
							}))
						}
					}
				},
				clearErrors: () =>
					set((state) => ({
						...state,
						errors: undefined
					})),
				clearCategories: () => set({ categories: [] }),
				setError: (error) => {
					if (isAxiosError(error)) {
						const errorContent = error.response?.data
							?.data as ICustomizedErrors

						set((state) => ({
							...state,
							errors: {
								...state.errors,
								items: errorContent
							}
						}))
					}
				},
				setLoading: (value) =>
					set((state) => ({
						...state,
						loading: value
					}))
			}),
			{
				name: 'search-storage',
				storage: createJSONStorage(() => sessionStorage)
			}
		)
	)
)
