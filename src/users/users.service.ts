import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Cart } from './entities/cart.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Cart)
    private cartsRepository: Repository<Cart>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const salt = bcrypt.genSaltSync(Math.floor(Math.random() * 3) + 10);
    const hashedPassword = bcrypt.hashSync(createUserDto.password, salt);
    const pwdWithPepper = bcrypt.hashSync(hashedPassword, process.env.PEPPER);

    const user = this.usersRepository.create({
      ...createUserDto,
      password: pwdWithPepper,
      salt: salt,
    });

    this.usersRepository.save(user);
    return {
      message: 'User created successfully',
      data: user,
    };
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username });
  }

  findOneById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  addBeerToCart(userId: number, beerId: number, quantity: number) {
    return this.cartsRepository
      .createQueryBuilder()
      .insert()
      .into(Cart)
      .values({ userId, beerId, quantity })
      .execute();
  }

  getCartByUserId(userId: number): Promise<Cart | undefined> {
    return this.cartsRepository
      .createQueryBuilder()
      .select()
      .where({ userId })
      .getOne();
  }
}
