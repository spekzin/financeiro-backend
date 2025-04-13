import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ParcelamentosService } from './parcelamentos.service';
import { Parcelamento } from './entities/parcelamento.entity';

@Controller('parcelamentos')
export class ParcelamentosController {
  constructor(private readonly service: ParcelamentosService) {}

  @Get()
  findAll(): Promise<Parcelamento[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Parcelamento | null> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Parcelamento>): Promise<Parcelamento> {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Parcelamento>): Promise<Parcelamento | null> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
