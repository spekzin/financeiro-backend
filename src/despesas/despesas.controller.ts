// despesas.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { DespesasService } from './despesas.service';
import { Despesa } from './entities/despesa.entity';

@Controller('despesas')
export class DespesasController {
  constructor(private readonly service: DespesasService) {}

  @Get()
  findAll(): Promise<Despesa[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Despesa> {
    return this.service.findById(id);
  }

  @Post()
  create(@Body() data: Partial<Despesa>): Promise<Despesa> {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Despesa>): Promise<Despesa> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }
}