import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receita } from './entities/receita.entity';

@Injectable()
export class ReceitasService {
  constructor(
    @InjectRepository(Receita)
    private receitaRepository: Repository<Receita>,
  ) {}

  findAll(): Promise<Receita[]> {
    return this.receitaRepository.find({ order: { nome: 'ASC' } });
  }

  findOne(id: string): Promise<Receita | null> {
    return this.receitaRepository.findOneBy({ id });
  }

  create(data: Partial<Receita>): Promise<Receita> {
    const nova = this.receitaRepository.create(data);
    return this.receitaRepository.save(nova);
  }

  async update(id: string, data: Partial<Receita>): Promise<Receita | null> {
    await this.receitaRepository.update(id, data);
    return this.receitaRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.receitaRepository.delete(id);
  }
}
