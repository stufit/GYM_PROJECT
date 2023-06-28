import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GymEntity } from './entities/gym.entity';
import { Repository } from 'typeorm';
import { GymEntityType } from '../gym/type/gym-entity.type';

@Injectable()
export class GymRepository {
  constructor(
    @InjectRepository(GymEntity)
    private readonly gymRepository: Repository<GymEntity>,
  ) {}

  async gymAllList({ pagingArgs, searchText }): Promise<GymEntityType[]> {
    const query = await this.gymRepository.createQueryBuilder(`g`).where(`1=1`);
    if (pagingArgs) {
      query
        .limit(pagingArgs.limit)
        .offset((pagingArgs.page - 1) * pagingArgs.limit);
    } else {
      query.limit(1000);
    }
    return query.getMany();
  }
}
