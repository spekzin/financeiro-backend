import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('validate')
  async validateLogin(@Body() body: { email: string, senha: string }) {
    const isValid = await this.usersService.validateUser(body.email, body.senha);
    return { success: isValid };
  }
}