// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
})
export class AuthModule {}