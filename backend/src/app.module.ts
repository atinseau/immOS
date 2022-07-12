import { Get, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		MongooseModule.forRoot('mongodb://localhost:27017', {
			dbName: 'immOS'
		}),
		UsersModule
	]
})
export class AppModule {}
