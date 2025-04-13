// despesas.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Despesa } from './entities/despesa.entity';

@Injectable()
export class DespesasService {
  constructor(
    @InjectRepository(Despesa)
    private readonly repo: Repository<Despesa>
  ) {}

  async findAll(): Promise<Despesa[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findById(id: string): Promise<Despesa> {
    const desp = await this.repo.findOne({ where: { id } });
    if (!desp) throw new NotFoundException('Despesa não encontrada');
    return desp;
  }

  async create(data: Partial<Despesa>): Promise<Despesa> {
    const nova = this.repo.create(data);
    return this.repo.save(nova);
  }

  async update(id: string, data: Partial<Despesa>): Promise<Despesa> {
    const desp = await this.findById(id);
    Object.assign(desp, data);
    return this.repo.save(desp);
  }

  async delete(id: string): Promise<void> {
    const resultado = await this.repo.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException('Despesa não encontrada');
    }
  }
}
