import { IsNumber, IsString } from 'class-validator';

export class addBeerDto {
  @IsNumber()
  readonly beerId: number;

  @IsString()
  readonly userId: number;

  @IsNumber()
  readonly quantity: number;
}
