import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BillBeer } from './billbeer.entity';

@Entity()
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @ManyToOne(() => User, (user) => user.bill)
  user: User;

  @OneToMany(() => BillBeer, (billBeer) => billBeer.bill)
  billBeer: BillBeer[];
}
