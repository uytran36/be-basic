import { BillBeer } from 'src/bills/entities/billbeer.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Beer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'real' })
  rating: number;

  @Column()
  image: string;

  @Column({ type: 'real' })
  price: number;

  @OneToMany(() => BillBeer, (billBeer) => billBeer.beer, { cascade: true })
  billBeer: BillBeer[];
}
