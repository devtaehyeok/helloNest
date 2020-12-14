import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // whitelist:  // validation을 위한 decorator가 붙어있지 않은 속성들은 제거
  // forbidNonWhiteList : true // whitelist 설정을 켜서 걸러질 속성이 있다면 아예 요청 자체를 막도록 (400 에러)
  // transform : 사용자가 보낸 데이터를 컨트롤러, 서비스에서 원하는 타입으로 바꿔줌
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,  // validation을 위한 decorator가 붙어있지 않은 속성들은 제거
      forbidNonWhitelisted: true,  // whitelist 설정을 켜서 걸러질 속성이 있다면 아예 요청 자체를 막도록 (400 에러)
      transform: true,  // 요청에서 넘어온 자료들의 형변환
    }),
  );
  await app.listen(3000);
}
bootstrap();
