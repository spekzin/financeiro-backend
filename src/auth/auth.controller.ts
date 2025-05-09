import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    if (email === 'juninho1981@gmail.com' && password === 'Junior3Bel') {
      return {
        id: 1,
        nome: 'Júnior e Bel',
        email: 'juninho1981@gmail.com',
        token: 'fake-jwt-token' // opcional
      };
    }

    return {
      statusCode: 401,
      message: 'Email ou senha inválidos'
    };
  }
}