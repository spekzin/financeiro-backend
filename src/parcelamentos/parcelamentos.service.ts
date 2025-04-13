import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parcelamento } from './entities/parcelamento.entity';

@Injectable()
export class ParcelamentosService {
  constructor(
    @InjectRepository(Parcelamento)
    private parcelamentoRepository: Repository<Parcelamento>,
  ) {}

  findAll(): Promise<Parcelamento[]> {
    return this.parcelamentoRepository.find({ order: { data: 'DESC' } });
  }

  findOne(id: string): Promise<Parcelamento | null> {
    return this.parcelamentoRepository.findOneBy({ id });
  }

  create(data: Partial<Parcelamento>): Promise<Parcelamento> {
    const novo = this.parcelamentoRepository.create(data);
    return this.parcelamentoRepository.save(novo);
  }

  async update(id: string, data: Partial<Parcelamento>): Promise<Parcelamento | null> {
    await this.parcelamentoRepository.update(id, data);
    return this.parcelamentoRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.parcelamentoRepository.delete(id);
  }
}
