import { Injectable, NotFoundException } from '@nestjs/common';
import { throws } from 'assert';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';
@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    // +  id로 바꾸는것도 가능
    const movie = this.movies.find((movie) => movie.id === +id);
    if (!movie) {
      throw new NotFoundException(`movie with id : ${id} not found`);
    }
    return movie;
  }

  deleteOne(id: string): boolean {
    const prevLen: number = this.getMovieLength();
    this.movies.filter((movie) => movie.id !== parseInt(id));
    if (this.getMovieLength() == prevLen) return false;
    return true;
  }

  create(movieData: CreateMovieDto): boolean {
    this.movies.push({ id: this.movies.length + 1, ...movieData });
    return true;
  }

  private getMovieLength(): number {
    return this.movies.length;
  }

  update(movieId: string, updateData: any) {
    const movie = this.getOne(movieId);
    this.deleteOne(movieId);
    this.movies.push({ ...movie, ...updateData }); // 과거의 데이터에 새로운 데이터를 더한다.
  }
}
