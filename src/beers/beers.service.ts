import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateBeerDto } from './dto/create-beer.dto';
import { UpdateBeerDto } from './dto/update-beer.dto';
import { Beer } from './entities/beer.entity';
import { IBeers } from './interfaces/beer.interfaces';

@Injectable()
export class BeersService {
  constructor(
    @InjectRepository(Beer)
    private beersRepository: Repository<Beer>,
  ) {}

  create(createBeerDto: CreateBeerDto) {
    return this.beersRepository.save(createBeerDto);
  }

  async findAll(
    pageSize: number,
    offset: number,
    keyword: string | null,
  ): Promise<IBeers> {
    const [result, total] = await this.beersRepository.findAndCount({
      take: pageSize,
      skip: offset * pageSize,
      where: {
        name: Like(`%${keyword || ''}%`),
      },
    });

    return { data: result, total };
  }

  findOne(id: number): Promise<Beer> | undefined {
    return this.beersRepository.findOneBy({ id });
  }

  update(id: number, updateBeerDto: UpdateBeerDto) {
    return this.beersRepository.update(id, updateBeerDto);
  }

  remove(id: number) {
    return this.beersRepository.delete(id);
  }
}
