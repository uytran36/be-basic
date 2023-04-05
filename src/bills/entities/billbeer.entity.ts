import { Beer } from 'src/beers/entities/beer.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Bill } from './bill.entity';

@Entity()
export class BillBeer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Bill, (bill) => bill.billBeer)
  bill: Bill;

  @ManyToOne(() => Beer, (beer) => beer.billBeer)
  beer: Beer;

  @Column()
  quantity: number;
}
