import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
