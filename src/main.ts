import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const corsOptions = {optionsSuccessStatus: 200, Credential:true, origin:'https://noblog.onrender.com',};
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  app.enableCors(corsOptions);
  await app.listen(4190);
}
bootstrap();
