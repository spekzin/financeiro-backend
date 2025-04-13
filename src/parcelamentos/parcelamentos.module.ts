import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parcelamento } from './entities/parcelamento.entity';
import { ParcelamentosService } from './parcelamentos.service';
import { ParcelamentosController } from './parcelamentos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Parcelamento])],
  controllers: [ParcelamentosController],
  providers: [ParcelamentosService],
})
export class ParcelamentosModule {}
