// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS direto, sem condição
  app.enableCors({
    origin: [
      'https://sistema-financeiro-bundle.vercel.app',
      'http://localhost:4200'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: '*',
    credentials: true
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
