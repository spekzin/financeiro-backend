// despesas.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Despesa } from './entities/despesa.entity';
import { DespesasService } from './despesas.service';
import { DespesasController } from './despesas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Despesa])],
  providers: [DespesasService],
  controllers: [DespesasController],
})
export class DespesasModule {}