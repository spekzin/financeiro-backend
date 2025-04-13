import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cartao } from './entities/cartoes.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CartoesService {
  constructor(
    @InjectRepository(Cartao)
    private cartaoRepository: Repository<Cartao>,
  ) {}

  findAll(): Promise<Cartao[]> {
    return this.cartaoRepository.find();
  }

  async update(id: string, data: Partial<Cartao>): Promise<Cartao> {
    await this.cartaoRepository.update(id, data);
    const cartao = await this.cartaoRepository.findOneBy({ id });

    if (!cartao) throw new NotFoundException('Cartão não encontrado');

    return cartao;
  }

  create(data: Partial<Cartao>): Promise<Cartao> {
    const novo = this.cartaoRepository.create(data);
    return this.cartaoRepository.save(novo);
  }

  async delete(id: string): Promise<void> {
    await this.cartaoRepository.delete(id);
  }  
}
