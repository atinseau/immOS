import { Body, Controller, Get, Post, UseFilters, UsePipes } from "@nestjs/common";
import { JoiValidationPipe } from "src/pipes/JoiValidation.pipe";
import { GlobalExceptionFilter } from "src/utils/GlobalExceptionFilter";
import { UsersService } from "../users.service";
import { userCreateSchema } from "../validator/create.validator";

@Controller("/users")
export class HomeController {

	constructor(
		private usersService: UsersService
	) { }

	@Get()
	getAll() {
		return this.usersService.findAll();
	}

	@Post("/create")
	@UsePipes(new JoiValidationPipe(userCreateSchema))
	@UseFilters(new GlobalExceptionFilter({ DUPLICATE_ERROR: "Cet utilisateur existe déjà" }))
	async createUser(@Body() body: UserCreatePayload) {
		return await this.usersService.createUser(body);
	}
}