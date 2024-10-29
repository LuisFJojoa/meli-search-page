import { ICustomizedErrors } from '@/contracts/types/backend/errors'
import { IItemsByQueryParamsResponse } from '@/contracts/types/backend/items'
import { SearchStoreState, SearchStoreValues } from '@/contracts/types/store'
import ItemsRepository from '@/services'
import { isAxiosError } from 'axios'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

export const initialState: SearchStoreValues = {
	items: [],
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
						set({ loading: true, errors: undefined })
						const itemsRepository = new ItemsRepository()
						const result: IItemsByQueryParamsResponse =
							await itemsRepository.getItemsByQueryParam(
								searchQuery
							)

						set((state) => ({
							...state,
							items: result.items,
							loading: false
						}))
					} catch (error) {
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
					}
				},
				clearErrors: () =>
					set((state) => ({
						...state,
						errors: undefined
					})),
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
