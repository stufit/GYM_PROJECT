import { Injectable } from '@nestjs/common';
import { GymRepository } from '../repositories/gym.repository';
import { GymEntityType } from './type/gym-entity.type';

@Injectable()
export class GymService {
  constructor(private readonly gymRepository: GymRepository) {}

  async gymAllList(args): Promise<GymEntityType[]> {
    const result = await this.gymRepository.gymAllList(args);
    return result;
  }
}
