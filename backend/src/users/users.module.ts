import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HomeController } from './controllers/home.controller';
import { UserSchema, User } from './model/user.schema';
import { UsersService } from './users.service';

@Module({
	imports: [
		MongooseModule.forFeature([{ 
			name: User.name, 
			schema: UserSchema
		}])
	],
	controllers: [HomeController],
	providers: [UsersService]
})
export class UsersModule {}
