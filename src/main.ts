import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * This application was designed using the NestJS framework.
 * 
 * "Nest is a framework for building efficient, scalable Node.js server-side applications. 
 * It uses progressive JavaScript, is built with TypeScript (preserves compatibility with pure JavaScript) 
 * and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), 
 * and FRP (Functional Reactive Programming)."
 * 
 * Nest. 2018. Introduction. [ONLINE] Available at: https://docs.nestjs.com/. [Accessed 30 July 2018].
 * 
 * Each entity defines a class from the domain model, and each entity has its own controller
 * and service.  Each entity also has a module class, for importing and exporting the controllers
 * and services, and also for the contruction of the application via the Nest @Module() decorators.
 * 
 * @author Olivier R.Bernier
 * 
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
}
bootstrap();