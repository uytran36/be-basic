import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MigService } from './mig.service';
import { CreateMigDto } from './dto/create-mig.dto';
import { UpdateMigDto } from './dto/update-mig.dto';

@Controller('mig')
export class MigController {
  constructor(private readonly migService: MigService) {}

  @Post()
  create(@Body() createMigDto: CreateMigDto) {
    return this.migService.create(createMigDto);
  }

  @Get()
  findAll() {
    return this.migService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.migService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMigDto: UpdateMigDto) {
    return this.migService.update(+id, updateMigDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.migService.remove(+id);
  }
}
