import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { BeersService } from './beers.service';
import { CreateBeerDto } from './dto/create-beer.dto';
import { UpdateBeerDto } from './dto/update-beer.dto';
import { Query, UseFilters, UseGuards } from '@nestjs/common/decorators';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IBeers } from './interfaces/beer.interfaces';

@Controller('beers')
@UseFilters(new HttpExceptionFilter())
@UseGuards(new JwtAuthGuard())
export class BeersController {
  constructor(private readonly beersService: BeersService) {}

  @Post()
  create(@Body(new ValidationPipe()) createBeerDto: CreateBeerDto) {
    return this.beersService.create(createBeerDto);
  }

  @Get()
  findAll(
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @Query('offset', ParseIntPipe) offset: number,
    @Query('keyword') keyword: string | null,
  ): Promise<IBeers> {
    const beers = this.beersService.findAll(pageSize, offset, keyword);
    return beers;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBeerDto: UpdateBeerDto) {
    return this.beersService.update(+id, updateBeerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.beersService.remove(+id);
  }
}
