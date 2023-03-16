import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly cats: string[] = [];

  create(cat: string) {
    this.cats.push(cat);
  }

  findAll(): string[] {
    return this.cats;
  }
}
