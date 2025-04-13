import { Test, TestingModule } from '@nestjs/testing';
import { ParcelamentosService } from './parcelamentos.service';

describe('ParcelamentosService', () => {
  let service: ParcelamentosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParcelamentosService],
    }).compile();

    service = module.get<ParcelamentosService>(ParcelamentosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
