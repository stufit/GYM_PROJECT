import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from '../repositories/entities/user.entity';
import { VerificationEntity } from '../repositories/entities/verification.entity';
import { JwtAccessStrategy } from '../auth/strategies/jwt-access.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, VerificationEntity])],
  providers: [UserResolver, UserService, UserRepository],
  exports: [TypeOrmModule, UserService, UserRepository],
})
export class UserModule {}
