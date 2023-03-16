import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class AppController {
  @Get()
  AppConfigService(): string {
    return 'This action returns all cats';
  }
}
