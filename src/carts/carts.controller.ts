import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  ValidationPipe,
  Put,
  Query,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';

@Controller('carts')
@UseGuards(JwtAuthGuard)
@UseInterceptors(TransformInterceptor)
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  create(@Body(new ValidationPipe()) createCartDto: CreateCartDto) {
    return this.cartsService.create(createCartDto);
  }

  @Get('user/:id')
  findByUserId(@Param('id') userId: number) {
    return this.cartsService.findByUserId(+userId);
  }

  @Get(':id')
  findByCartId(@Param('id') cartId: string) {
    return this.cartsService.findByCartId(cartId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(id, updateCartDto);
  }

  @Delete(':id')
  removeItems(@Param('id') id: string, @Query('beerId') beerId: number) {
    return this.cartsService.removeItems(id, +beerId);
  }

  @Get('pay/:id')
  pay(@Param('id') id: string) {
    return this.cartsService.payCart(id);
  }
}
