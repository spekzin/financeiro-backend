import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

export async function createNestServer() {
  const expressApp = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

  app.enableCors({
    origin: ['https://sistema-financeiro-bundle.vercel.app'],
    credentials: true,
  });

  await app.init();
  return expressApp;
}

if (!process.env.VERCEL) {
  createNestServer().then(app => app.listen(3000));
}
