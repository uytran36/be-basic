import { PartialType } from '@nestjs/mapped-types';
import { CreateMigDto } from './create-mig.dto';

export class UpdateMigDto extends PartialType(CreateMigDto) {}
