import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorWithCode, STATUS } from 'src/utils/ErrorWithCode';
import { User, UserDocument } from './model/user.schema';

import { createHash } from 'crypto';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>
	) {}

	async findAll(): Promise<UserDocument[]> {
		return await this.userModel.find()
	}

	async createUser(payload: UserCreatePayload) {
		const user = await this.userModel.create({
			...payload,
			password: createHash('sha256').update(payload.password).digest("hex")
		})
		if (!user)
			throw new ErrorWithCode("Aucun utilisateur n'a été crée", STATUS.INTERNAL_ERROR) 
		return user
	}
}