import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be four', () => {
    expect(2 + 2).toEqual(4);
  });

  describe('getAll', () => {
    it('it should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });
  describe('getOne', () => {
    it('it should return a movie', () => {
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
      expect(movie.title).toEqual('test movie');
    });
    it('it should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('movie with id : 999 not found');
      }
    });
  });
  describe('deleteOne', () => {
    // individual test
    it('deletes a movie', () => {
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2000,
      });
      // 생성되었어야 한다.
      const beforeDeleteLength: number = service.getAll().length;
      service.deleteOne(1);
      const afterDeleteLength: number = service.getAll().length;
      expect(beforeDeleteLength).toBeGreaterThan(afterDeleteLength);
    });
    it('it should throw 404 error', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('create', () => {
    // individual test
    it('create a movie', () => {
      const beforeCreateLength: number = service.getAll().length;
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2000,
      });
      // 생성되었어야 한다.
      const afterCreateLength: number = service.getAll().length;
      expect(afterCreateLength).toBeGreaterThan(beforeCreateLength);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2000,
      });
      service.update(1, { title: 'updated movie' });
      expect(service.getOne(1).title).toEqual('updated movie');
    });
    it('it should throw NotFoundException', () => {
      try {
        service.update(999, { title: 'it should throw error' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
