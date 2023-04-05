import { IsInt } from 'class-validator';

export class UpdateCartDto {
  @IsInt()
  beerId: number;

  @IsInt()
  quantity: number;
}
