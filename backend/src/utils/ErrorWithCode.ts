
export enum STATUS {
	INTERNAL_ERROR = -1,
	VALIDATION_ERROR = -2,
	DUPLICATE_ERROR = 11000
}

export class ErrorWithCode extends Error {
	constructor(
		public readonly message: string,
		public readonly code: STATUS = STATUS.INTERNAL_ERROR,
	) {
		super(message)
	}
} 