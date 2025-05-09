import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cartao } from './cartoes/entities/cartoes.entity';
import { CartoesModule } from './cartoes/cartoes.module';
import { ParcelamentosModule } from './parcelamentos/parcelamentos.module';
import { Parcelamento } from './parcelamentos/entities/parcelamento.entity';
import { ReceitasModule } from './receitas/receitas.module';
import { Receita } from './receitas/entities/receita.entity';
import { CategoriasModule } from './categorias/categorias.module';
import { Categoria } from './categorias/entities/categoria.entity';
import { DespesasModule } from './despesas/despesas.module';
import { Despesa } from './despesas/entities/despesa.entity';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { Lancamento } from './lancamentos/entities/lancamento.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'financeiro.db',
      entities: [Cartao, Parcelamento, Receita, Categoria, Despesa, Lancamento, User],
      synchronize: true,
    }),
    CartoesModule,
    ParcelamentosModule,
    ReceitasModule,
    CategoriasModule,
    DespesasModule,
    LancamentosModule,
    UsersModule,
    AuthModule
  ],
})
export class AppModule {}
