import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from './entities/bill.entity';
import { Repository } from 'typeorm';
import { BillBeer } from './entities/billbeer.entity';
import { User } from 'src/users/entities/user.entity';
import { Beer } from 'src/beers/entities/beer.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from 'src/carts/entities/cart.entity';
import { Model } from 'mongoose';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill)
    private billsRepository: Repository<Bill>,

    @InjectRepository(BillBeer)
    private billBeersRepository: Repository<BillBeer>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Beer)
    private beersRepository: Repository<Beer>,

    @InjectModel(Cart.name)
    private cartModel: Model<Cart>,
  ) {}

  async create(createBillDto: CreateBillDto) {
    const user = await this.usersRepository.findOneBy({
      id: createBillDto.userId,
    });
    const bill = await this.billsRepository.save({
      user,
      price: createBillDto.price,
    });

    createBillDto.beers.forEach(async (item) => {
      const beer = await this.beersRepository.findOneBy({
        id: item.beerId,
      });

      await this.billBeersRepository.save({
        beer: beer,
        bill: bill,
        quantity: item.quantity,
      });
    });

    await this.cartModel.findOneAndUpdate(
      { userId: user.id },
      { isPayed: true },
    );
    return bill;
  }

  findAll() {
    return `This action returns all bills`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bill`;
  }

  update(id: number, updateBillDto: UpdateBillDto) {
    return `This action updates a #${id} bill`;
  }

  remove(id: number) {
    return `This action removes a #${id} bill`;
  }
}
