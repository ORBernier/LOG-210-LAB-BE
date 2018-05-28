import { NestFactory } from '@nestjs/core';
import "reflect-metadata";
import { ApplicationModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule);
	await app.listen(3000);
}
bootstrap();
