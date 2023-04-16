import { Injectable } from '@nestjs/common';
import { CreateMigDto } from './dto/create-mig.dto';
import { UpdateMigDto } from './dto/update-mig.dto';

@Injectable()
export class MigService {
  create(createMigDto: CreateMigDto) {
    return 'This action adds a new mig';
  }

  findAll() {
    return `This action returns all mig`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mig`;
  }

  update(id: number, updateMigDto: UpdateMigDto) {
    return `This action updates a #${id} mig`;
  }

  remove(id: number) {
    return `This action removes a #${id} mig`;
  }
}
