import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from '../repositories/entities/user.entity';
import { VerificationEntity } from '../repositories/entities/verification.entity';
import { UserController } from './user.controller';
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, VerificationEntity])],
  providers: [UserResolver, UserService, UserRepository, GoogleStrategy],
  exports: [TypeOrmModule],
  controllers: [UserController],
})
export class UserModule {}
