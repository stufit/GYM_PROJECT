import { Module } from '@nestjs/common';
import { GymService } from './gym.service';
import { GymResolver } from './gym.resolver';

@Module({
  providers: [GymService, GymResolver]
})
export class GymModule {}
