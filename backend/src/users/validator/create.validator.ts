import Joi from "joi"

export const userCreateSchema = Joi.object<UserCreatePayload>({
	email: Joi
		.string()
		.email()
		.required()
		.error(new Error("Aucun email n'a été fourni")),

	password: Joi
		.string()
		.required()
		.pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"))
		.error(new Error("Aucun mot de passe ou mot de passe invalide")),

	lastname: Joi
		.string()
		.required()
		.error(new Error("Aucun nom de famille n'a été fourni")),

	firstname: Joi.string().allow(null)
})