import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('access middleware...');
    next();
  }
}

/**
 * you can use middleware in the following way:
 *
 * export function logger(req: Request, res: Response, next: NextFunction) {
 *  console.log(`Request...`);
 *  next();
 * };
 */
