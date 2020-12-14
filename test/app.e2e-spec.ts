import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateMovieDto } from 'src/movies/dto/create-movie.dto';

// endpoint테스트
// movies
// movies/:id
describe('AppController (e2e)', () => {
  let app: INestApplication;
  // 매 테스트마다 애플리케이션을 만듬
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
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
    it('POST', () => {
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
  });

  describe('/movies/id', () => {
    it.todo('GET');
    it.todo('DELETE');
    it.todo('PATCH');
  });
});
