import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ReceitasService } from './receitas.service';
import { Receita } from './entities/receita.entity';

@Controller('receitas')
export class ReceitasController {
  constructor(private readonly receitasService: ReceitasService) {}

  @Get()
  findAll(): Promise<Receita[]> {
    return this.receitasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Receita | null> {
    return this.receitasService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Receita>): Promise<Receita> {
    return this.receitasService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Receita>): Promise<Receita | null> {
    return this.receitasService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.receitasService.remove(id);
  }
}
