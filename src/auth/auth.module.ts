import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth.guard';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthGuard
  ],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SEED,
      signOptions: {expiresIn: '2h'}
    })
  ],
  exports:[AuthService, AuthGuard]
})
export class AuthModule {}
