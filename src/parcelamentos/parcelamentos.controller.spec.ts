import { Test, TestingModule } from '@nestjs/testing';
import { ParcelamentosController } from './parcelamentos.controller';
import { ParcelamentosService } from './parcelamentos.service';

describe('ParcelamentosController', () => {
  let controller: ParcelamentosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParcelamentosController],
      providers: [ParcelamentosService],
    }).compile();

    controller = module.get<ParcelamentosController>(ParcelamentosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
