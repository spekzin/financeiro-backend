// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity'; // importa a entidade

@Module({
  imports: [TypeOrmModule.forFeature([User])], // necessário para o repositório funcionar
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // caso queira usar em outros módulos como Transactions
})
export class UsersModule {}