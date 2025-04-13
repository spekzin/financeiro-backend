import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly repo: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Categoria[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findById(id: string): Promise<Categoria> {
    const cat = await this.repo.findOne({ where: { id } });
    if (!cat) throw new NotFoundException('Categoria não encontrada');
    return cat;
  }

  async create(data: Partial<Categoria>): Promise<Categoria> {
    const nova = this.repo.create(data);
    return this.repo.save(nova);
  }

  async update(id: string, data: Partial<Categoria>): Promise<Categoria> {
    const cat = await this.findById(id);
    Object.assign(cat, data);
    return this.repo.save(cat);
  }

  async delete(id: string): Promise<void> {
    const resultado = await this.repo.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException('Categoria não encontrada');
    }
  }
}
