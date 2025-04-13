import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { CartoesService } from './cartoes.service';
import { Cartao } from './entities/cartoes.entity';

@Controller('cartoes')
export class CartoesController {
  constructor(private readonly cartoesService: CartoesService) {}

  @Get()
  findAll(): Promise<Cartao[]> {
    return this.cartoesService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<Cartao>) {
    return this.cartoesService.update(id, dto);
  }

  @Post()
  create(@Body() cartao: Partial<Cartao>): Promise<Cartao> {
    return this.cartoesService.create(cartao);
  }

  @Post('delete/:id')
  async delete(@Param('id') id: string) {
    return this.cartoesService.delete(id);
  }
}
