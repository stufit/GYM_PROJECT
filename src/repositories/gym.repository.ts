import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GymEntity } from './entities/gym.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GymRepository {
  constructor(
    @InjectRepository(GymEntity)
    private readonly gymRepository: Repository<GymRepository>,
  ) {}
}
