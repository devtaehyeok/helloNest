import { Body, Delete, Patch, Post, Query } from '@nestjs/common';
import { Controller, Get, Param } from '@nestjs/common';
import { strict } from 'assert';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(readonly moviesService: MoviesService) {}
  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }
  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `we are searching for a movie made after : ${searchingYear}`;
  }

  @Get('/:id')
  getOne(@Param('id') movieId: number): Movie {
    return this.moviesService.getOne(movieId);
  }
  // 원하는 것을 요청하라
  @Post()
  create(@Body() movieData: CreateMovieDto): boolean {
    return this.moviesService.create(movieData);
  }
  @Delete('/:id')
  remove(@Param('id') movieId: number): boolean {
    return this.moviesService.deleteOne(movieId);
  }
  // put은 전부를 교체, patch는 일부를 교체
  @Patch('/:id')
  patch(@Param('id') movieId: number, @Body() updateData:UpdateMovieDto) {
    return this.moviesService.update(movieId, updateData);
  }
}
