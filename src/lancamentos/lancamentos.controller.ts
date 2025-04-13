import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { LancamentosService } from './lancamentos.service';
import { Lancamento } from './entities/lancamento.entity';

@Controller('lancamentos')
export class LancamentosController {
  constructor(private readonly service: LancamentosService) {}

  @Get()
  findAll(): Promise<Lancamento[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Lancamento> {
    return this.service.findById(id);
  }

  @Post()
  create(@Body() dto: Partial<Lancamento>): Promise<Lancamento> {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<Lancamento>): Promise<Lancamento> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }
}
