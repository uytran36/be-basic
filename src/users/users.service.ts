import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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
}
