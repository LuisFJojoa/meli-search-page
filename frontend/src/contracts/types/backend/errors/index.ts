import { HTTP_SATUS_CODE } from "@/contracts/enums/main"


export interface ICustomizedErrors {
	code: number
	message: string
}
export interface ICustomizedErrorResponse {
	code: HTTP_SATUS_CODE
	response: ICustomizedErrors
}

type ItemErrorKeys = 'all' | 'details' | 'description'

export type customizedErrors = {
	item: {
		[key in ItemErrorKeys]: ICustomizedErrors
	}
}