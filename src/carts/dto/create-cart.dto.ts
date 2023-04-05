import { IsArray, IsBoolean, IsNumber } from 'class-validator';

export class CreateCartDto {
  @IsNumber()
  userId: number;

  @IsArray()
  beers: { beerId: number; quantity: number }[];

  @IsBoolean()
  isPayed: boolean;
}
