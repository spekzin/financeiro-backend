import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Receita } from 'src/receitas/entities/receita.entity';
import { Despesa } from 'src/despesas/entities/despesa.entity';
import { Parcelamento } from 'src/parcelamentos/entities/parcelamento.entity';
import { Lancamento } from 'src/lancamentos/entities/lancamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receita, Despesa, Parcelamento, Lancamento])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
