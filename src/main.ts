import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // whitelist:true로 데코레이터가 없는 프로퍼티 거름
  // forbidNonWhiteList : true
  // transform : 사용자가 보낸 데이터를 원하는 타입으로 바꿔줌
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
