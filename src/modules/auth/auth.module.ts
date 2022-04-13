import { AuthController } from './auth.controller';
import { UserModule } from './../user/user.module';
import { BcryptService } from './services/bcrypt.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthService } from './services/auth.service';

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, BcryptService],
  exports: [AuthService],
})
export class AuthModule {}
