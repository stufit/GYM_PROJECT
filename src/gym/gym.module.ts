import { Module } from '@nestjs/common';
import { GymService } from './gym.service';
import { GymResolver } from './gym.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GymEntity } from '../repositories/entities/gym.entity';
import { GymRepository } from '../repositories/gym.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GymEntity])],
  providers: [GymService, GymResolver, GymRepository],
})
export class GymModule {}
