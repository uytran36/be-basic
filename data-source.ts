import { Beer } from 'src/beers/entities/beer.entity';
import { Bill } from 'src/bills/entities/bill.entity';
import { BillBeer } from 'src/bills/entities/billbeer.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import { Mig } from 'src/mig/entities/mig.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['./src/**/*.entity.ts'],
  // entities: [User, Beer, Bill, BillBeer, Mig],
  synchronize: true,
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
