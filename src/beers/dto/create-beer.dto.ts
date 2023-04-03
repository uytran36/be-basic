import { IsNumber, IsString } from 'class-validator';

export class CreateBeerDto {
  @IsString()
  name: string;

  @IsNumber()
  rating: number;

  @IsString()
  image: string;

  @IsNumber()
  price: number;
}
