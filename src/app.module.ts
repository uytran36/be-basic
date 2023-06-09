import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { AllExceptionsFilter } from './common/all-exception.filter';
import { ValidationPipe } from './common/pipe/validation.pipe';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { BeersModule } from './beers/beers.module';
import { Beer } from './beers/entities/beer.entity';
import { BillsModule } from './bills/bills.module';
import { BillBeer } from './bills/entities/billbeer.entity';
import { Bill } from './bills/entities/bill.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { CartsModule } from './carts/carts.module';
import { dataSourceOptions } from 'data-source';
import { MigModule } from './mig/mig.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRoot(dataSourceOptions),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.DB_HOST,
    //   port: parseInt(process.env.DB_PORT),
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_NAME,
    //   entities: [User, Beer, Bill, BillBeer],
    //   synchronize: true,
    // }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    BeersModule,
    BillsModule,
    BillBeer,
    CartsModule,
    MigModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'users', method: RequestMethod.POST }, 'users/(.*)')
      .forRoutes({ path: 'users', method: RequestMethod.GET });
  }
}
