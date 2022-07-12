import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { ErrorWithCode, STATUS } from './ErrorWithCode';
import { FastifyReply } from "fastify"

type ErrorFormatter = Partial<Record<keyof typeof STATUS, string>>;


@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {

	constructor(
		private readonly formatter?: ErrorFormatter
	) {}

	private format(code: STATUS, output: { statusCode: HttpStatus, message: string }) {
		if (this.formatter)
			output.message = this.formatter[STATUS[code]] || output.message
		return output
	}

	catch(exception: ErrorWithCode, host: ArgumentsHost) {

		let httpCode = HttpStatus.BAD_REQUEST
		let message = exception.message

		switch (exception.code) {
			case STATUS.DUPLICATE_ERROR:
				httpCode = HttpStatus.CONFLICT
				break;
			case STATUS.INTERNAL_ERROR:
				httpCode = HttpStatus.INTERNAL_SERVER_ERROR
				break;
			case STATUS.VALIDATION_ERROR:
				httpCode = HttpStatus.UNPROCESSABLE_ENTITY
				break;
		}

		const ctx = host.switchToHttp();
		const response = ctx.getResponse<FastifyReply>();
		response.status(httpCode).send(this.format(exception.code, {
			statusCode: httpCode,
			message: message
		}));
	}

}