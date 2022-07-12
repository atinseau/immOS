import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';
import { ErrorWithCode, STATUS } from 'src/utils/ErrorWithCode';

@Injectable()
export class JoiValidationPipe<T = any> implements PipeTransform {

	constructor(
		private readonly schema: ObjectSchema<T>
	) {}

	transform(value: T, metadata: ArgumentMetadata) {
		const { error } = this.schema.validate(value)
		if (error)
			throw new ErrorWithCode(error.message, STATUS.VALIDATION_ERROR)
		return value;
	}
}