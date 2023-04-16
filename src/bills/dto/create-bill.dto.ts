import { IsArray, IsNumber } from 'class-validator';

export class CreateBillDto {
  @IsNumber()
  userId: number;

  @IsArray()
  beers: { beerId: number; quantity: number }[];

  @IsNumber()
  price: number;
}
