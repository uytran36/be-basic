import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorsInterceptor } from './interceptors/error.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
// import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.REDIS,
  //   options: {
  //     host: 'localhost',
  //     port: 6379,
  //   },
  // });

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new ErrorsInterceptor());
  // await app.startAllMicroservices();
  app.enableCors();
  await app.listen(process.env.APP_PORT);
}
bootstrap();
