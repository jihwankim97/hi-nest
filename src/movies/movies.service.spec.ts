import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

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

  describe('is Array test', () => {
    it('isArray', () => {
      expect(service.getAll()).toBeInstanceOf(Array);
    });
  });

  describe('search Movie', () => {
    it('get a MovieItem', () => {
      service.create({
        title: 'Movie1',
        genres: ['test'],
        year: 11,
      });
      const movie = service.getOne(1);

      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException)
        expect(e.message).toEqual('movie width id 999 not found.')
      }
    });
  });

  // describe('search Movie', () => {
  //   it('get a MovieItem', () => {
  //     service.create({
  //       title: 'Test Movie',
  //       genres: ['test'],
  //       year: 2000,
  //     });
  //     const movie = service.getOne(1);
  //     expect(movie).toBeDefined();
  //   });

  // });
});
