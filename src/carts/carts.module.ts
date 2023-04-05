import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './entities/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beer } from 'src/beers/entities/beer.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    TypeOrmModule.forFeature([Beer]),
  ],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
