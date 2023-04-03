import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { APP_GUARD } from '@nestjs/core';
import { User } from './entities/user.entity';
import { RolesGuard } from 'src/role/role.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  // for using the repository outside module
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
