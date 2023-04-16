import { Module } from '@nestjs/common';
import { MigService } from './mig.service';
import { MigController } from './mig.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mig } from './entities/mig.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mig])],
  controllers: [MigController],
  providers: [MigService],
  exports: [TypeOrmModule, MigService],
})
export class MigModule {}
