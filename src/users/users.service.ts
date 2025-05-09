import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createDefaultUser(): Promise<void> {
    const email = 'juninho1981@gmail.com';
    const senha = 'Junior3Bel';

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (!existingUser) {
      const user = this.userRepository.create({ email, senha });
      await this.userRepository.save(user);
      console.log('✅ Usuário padrão criado com sucesso!');
    }
  }

  async validateUser(email: string, senha: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email, senha } });
    return !!user;
  }
}