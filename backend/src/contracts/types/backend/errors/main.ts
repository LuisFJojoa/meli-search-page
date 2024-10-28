import { HTTP_SATUS_CODE } from "@/contracts/enums/main.js";

export interface ICustomizedErrors {
	code: number
	message: string
}
export interface ICustomizedErrorResponse {
	code: HTTP_SATUS_CODE
	response: ICustomizedErrors
}

type ItemErrorKeys = 'all' |'details' | 'description'
type CategoriesErrorKeys = 'breadcrumb'

export type customizedErrors = {
	item: {
		[key in ItemErrorKeys]: ICustomizedErrors
	}
	categories: {
		[key in CategoriesErrorKeys]: ICustomizedErrors
	}
}