import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { Bill } from './entities/bill.entity';
import { BillBeer } from './entities/billbeer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Bill, BillBeer])],
  controllers: [BillsController],
  providers: [BillsService],
})
export class BillsModule {}
