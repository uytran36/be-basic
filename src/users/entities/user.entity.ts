import { Bill } from 'src/bills/entities/bill.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column({
    nullable: true,
  })
  salt: string;

  @OneToMany(() => Bill, (bill) => bill.user, { cascade: true })
  bill: Bill[];
}
