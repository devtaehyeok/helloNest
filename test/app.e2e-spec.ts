import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateMovieDto } from 'src/movies/dto/create-movie.dto';
import { UpdateMovieDto } from 'src/movies/dto/update-movie.dto';

// endpoint테스트
// movies
// movies/:id
describe('AppController (e2e)', () => {
  let app: INestApplication;
  // 매 테스트마다 애플리케이션을 만듬
  // 테스트에서도 실제 애플리케이션의 환경을 그대로 적용시켜줘야 한다.
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // validation을 위한 decorator가 붙어있지 않은 속성들은 제거
        forbidNonWhitelisted: true, // whitelist 설정을 켜서 걸러질 속성이 있다면 아예 요청 자체를 막도록 (400 에러)
        transform: true, // 요청에서 넘어온 자료들의 형변환
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my homepage!');
  });
  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });
    it('POST 201', () => {
      const sendData: CreateMovieDto = {
        title: 'test',
        year: 2020,
        genres: ['test'],
      };
      return request(app.getHttpServer())
        .post('/movies')
        .send(sendData)
        .expect(201);
    });
    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
    it('POST 400', () => {
      const sendData2 = {
        title: 'test2',
        year: 2020,
        genres: ['test'],
        others: 'dragon',
        others2: 'dragon',
      };
      return request(app.getHttpServer())
        .post('/movies')
        .send(sendData2)
        .expect(400);
    });
  });

  describe('/movies/id', async () => {
    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'test2', year: 2020, genres: ['test'] })
        .expect(200);
    });
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/404').expect(404);
    });
    // 위쪽 Describe에서 만들어서 저장되어 있음.

    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
  });
});
