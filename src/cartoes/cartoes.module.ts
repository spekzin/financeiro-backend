import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cartao } from './entities/cartoes.entity';
import { CartoesService } from './cartoes.service';
import { CartoesController } from './cartoes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cartao])],
  controllers: [CartoesController],
  providers: [CartoesService],
})
export class CartoesModule {}
