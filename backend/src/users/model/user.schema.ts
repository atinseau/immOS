import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;

/*
** Field to improve:
** - config_capability 
** - role
** - address
**
**
*/

enum UserGender {
	WOMAN = 0,
	MEN = 1,
	OTHER = 2
}

@Schema({
	toJSON: {
		virtuals: true
	}
})
export class User {

	@Prop({ required: true,unique: true })
	email: string

	@Prop({ required: true })
	password: string

	@Prop({ default: null })
	token: string | null

	@Prop({ default: false })
	verified: boolean

	@Prop()
	phone: string | null

	@Prop({ default: "https://via.placeholder.com/150" })
	avatar: string

	@Prop({ default: UserGender.MEN })
	gender: UserGender

	@Prop()
	address: string

	@Prop()
	firstname: string

	@Prop()
	lastname: string

	// virtual 
	fullname: string
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual("fullname").get(function () {
	return `${this.firstname} ${this.lastname}`;
})

export {
	UserSchema
}