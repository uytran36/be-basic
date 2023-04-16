import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { Bill } from './entities/bill.entity';
import { BillBeer } from './entities/billbeer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beer } from 'src/beers/entities/beer.entity';
import { User } from 'src/users/entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from 'src/carts/entities/cart.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bill, BillBeer, Beer, User]),
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
  ],
  controllers: [BillsController],
  providers: [BillsService],
})
export class BillsModule {}
