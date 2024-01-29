import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Patch,
  Body,
  Query,
  Res,
  Req,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/updata-movie.dto';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService:MoviesService){}


  @Get()
  getAll(@Req() req, @Res() res): Movie[] {
    return this.moviesService.getAll();
  }

//   @Get('search')
//   search(@Query('Year') searchingYear:String){

//     return `We are searching for a movie width a title: ${searchingYear}`
//   }

  @Get('/:id')
  getOne(@Param('id') movieId: number):Movie {
    console.log(typeof movieId);
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() MovieData:CreateMovieDto) {
    
    return this.moviesService.create(MovieData)
  }
  @Delete('/:id')
  removeMovie(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }
  

  @Patch('/:id') 
  path(@Param('id') movieId: number, @Body() updateData:UpdateMovieDto) {
    return this.moviesService.update(movieId, updateData);
  }
}
