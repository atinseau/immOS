import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './todos.schema';

@Injectable()
export class TodosService {

	constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

	async findAll() {
		return await this.todoModel.find();
	}
}
