import { Beer } from 'src/beers/entities/beer.entity';

export interface ICart {
  userId: number;
  beers: { beer: Beer; quantity: number }[];
  isPayed: boolean;
}
