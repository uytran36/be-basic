import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  // HttpException,
  HttpStatus,
  UseGuards,
  SetMetadata,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, createUserSchema } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interfaces/users.interfaces';
import { UseFilters, UsePipes } from '@nestjs/common/decorators';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { JoiValidationPipe } from 'src/common/pipe/joi-validation.pipe';
import { RolesGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/role.decorator';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { Role } from 'src/role/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
// @UseFilters(new HttpExceptionFilter()) // you can put this here
@UseInterceptors(TransformInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseFilters(HttpExceptionFilter)
  @UsePipes(new JoiValidationPipe(createUserSchema))
  @SetMetadata('role', ['admin'])
  // with class-tranformer
  // create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
  create(@Body() createUserDto: CreateUserDto) {
    // throw new HttpException('error', HttpStatus.NOT_FOUND);
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<IUser[]> {
    const users = await this.usersService.findAll();
    return users.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
    }));
  }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    const data = await this.usersService.findOneById(+id);
    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      username: data.username,
      phoneNumber: data.phoneNumber,
    };
  }

  // Easier way to add role decorator than using @SetMetadata('role', ['admin'])
  @Put(':id')
  // @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
