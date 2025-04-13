import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lancamento } from './entities/lancamento.entity';

@Injectable()
export class LancamentosService {
  constructor(
    @InjectRepository(Lancamento)
    private readonly repo: Repository<Lancamento>
  ) {}

  findAll(): Promise<Lancamento[]> {
    return this.repo.find({ order: { data: 'DESC' } });
  }

  async findById(id: string): Promise<Lancamento> {
    const lanc = await this.repo.findOne({ where: { id } });
    if (!lanc) throw new NotFoundException('Lançamento não encontrado');
    return lanc;
  }

  create(data: Partial<Lancamento>): Promise<Lancamento> {
    const novo = this.repo.create(data);
    return this.repo.save(novo);
  }

  async update(id: string, data: Partial<Lancamento>): Promise<Lancamento> {
    const lanc = await this.findById(id);
    Object.assign(lanc, data);
    return this.repo.save(lanc);
  }

  async delete(id: string): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Lançamento não encontrado');
    }
  }
}
