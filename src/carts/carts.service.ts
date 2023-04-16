import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './entities/cart.entity';
import { Model } from 'mongoose';
import { ICart } from './interfaces/cart.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Beer } from 'src/beers/entities/beer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    @InjectRepository(Beer)
    private beersRepository: Repository<Beer>,
  ) {}

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    const createdCart = new this.cartModel(createCartDto);
    return createdCart.save();
  }

  async findByUserId(userId: number): Promise<Cart> {
    const listCart = await this.cartModel.find({ userId }).exec();
    return listCart.find((cart) => cart.isPayed === false);
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    const cart = await this.cartModel.findOne({ _id: id });

    if (cart) {
      for (const item of cart.beers) {
        if (item.beerId === updateCartDto.beerId) {
          item.quantity += updateCartDto.quantity;
          return cart.save();
        }
      }
      cart.beers.push(updateCartDto);
      return cart.save();
    }
    return 'aaaa';
  }

  async findByCartId(cartId: string): Promise<ICart | null> {
    const cart = await this.cartModel.findById(cartId).exec();
    if (cart) {
      const mappedBeers = cart.beers.map(async (item) => {
        const beer = await this.beersRepository.findOneBy({ id: item.beerId });
        return { beer, quantity: item.quantity };
      });
      return {
        userId: cart.userId,
        beers: await Promise.all(mappedBeers),
        isPayed: cart.isPayed,
      };
    }
    return null;
  }

  async removeItems(id: string, beerId: number): Promise<ICart | null> {
    const cart = await this.cartModel.findById(id).exec();
    if (cart) {
      this.cartModel
        .updateOne(
          { _id: id },
          { beers: cart.beers.filter((item) => item.beerId !== beerId) },
        )
        .exec();
      console.log('first');
      return await this.findByCartId(id);
    }
    return null;
  }

  async payCart(id: string): Promise<ICart | null> {
    const cart = await this.cartModel.findById(id).exec();
    if (cart) {
      cart.isPayed = true;
      cart.save();
      return await this.findByCartId(id);
    }
    return null;
  }
}
