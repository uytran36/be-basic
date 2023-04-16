import { Test, TestingModule } from '@nestjs/testing';
import { MigController } from './mig.controller';
import { MigService } from './mig.service';

describe('MigController', () => {
  let controller: MigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MigController],
      providers: [MigService],
    }).compile();

    controller = module.get<MigController>(MigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
