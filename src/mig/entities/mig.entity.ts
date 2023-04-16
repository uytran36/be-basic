import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mig {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
