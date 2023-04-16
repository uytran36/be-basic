import { Test, TestingModule } from '@nestjs/testing';
import { MigService } from './mig.service';

describe('MigService', () => {
  let service: MigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MigService],
    }).compile();

    service = module.get<MigService>(MigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
