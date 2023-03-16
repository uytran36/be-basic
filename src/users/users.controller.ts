import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, createUserSchema } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/users.interfaces';
import { Query, UseFilters, UsePipes } from '@nestjs/common/decorators';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { JoiValidationPipe } from 'src/common/pipe/joi-validation.pipe';
import { RolesGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/role.decorator';

@Controller('users')
@UseGuards(RolesGuard)
// @UseFilters(new HttpExceptionFilter()) // you can put this here
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
  findAll(@Query() query): Promise<User[]> {
    if (query.id === 'a') {
      throw new HttpException('error', HttpStatus.BAD_REQUEST);
    }
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.usersService.findOne(+id);
  }

  // Easier way to add role decorator than using @SetMetadata('role', ['admin'])
  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
