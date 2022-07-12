import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

describe('Users module (e2e)', () => {
	let app: NestFastifyApplication;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
		app.setGlobalPrefix("/v1/api")
		await app.init();
		await app.getHttpAdapter().getInstance().ready();
	});

	it('/ (GET)', () => {
		return app
			.inject({
				method: 'GET',
				url: '/v1/api/users',
			})
			.then((result) => {
				const body = result.json()

				expect(result.statusCode).toEqual(200);
				expect(Array.isArray(body)).toBe(true)
			});
	});

	afterAll(async () => {
		await app.close();
	});
});
