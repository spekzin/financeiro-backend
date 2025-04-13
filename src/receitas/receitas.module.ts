import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceitasController } from './receitas.controller';
import { ReceitasService } from './receitas.service';
import { Receita } from './entities/receita.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receita])],
  controllers: [ReceitasController],
  providers: [ReceitasService],
})
export class ReceitasModule {}
