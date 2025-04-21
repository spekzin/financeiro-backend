// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap()  {
  const app = await NestFactory.create(AppModule);
  
  // Configuração CORS baseada em ambiente
  const isDev = process.env.NODE_ENV !== 'production';
  
  if (isDev) {
    // Ambiente de desenvolvimento - mais permissivo
    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: '*',
    });
  } else {
    // Ambiente de produção - mais restritivo
    const allowedOrigins = [
      'https://sistema-financeiro-bundle.vercel.app/',
      'http://localhost:4200'
    ];
    
    app.enableCors({
      origin: (origin, callback)  => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });
  }
  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
