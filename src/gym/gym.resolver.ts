import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GymService } from './gym.service';
import { GymEntityType } from './type/gym-entity.type';
import { GymFindInput } from './input/find.input';

@Resolver()
export class GymResolver {
  constructor(private readonly gymService: GymService) {}

  // 1. 헬스장 생성
  @Mutation(() => GymEntityType)
  async createGym() {
    return;
  }

  // 2. 헬스장 리스트
  @Query(() => [GymEntityType], {
    name: 'GYM_ALL_LIST',
    description: '모든 헬스장 리스트',
  })
  async gymAllList(
    @Args('GYM_FIND_INPUT', { type: () => GymFindInput, nullable: true })
    args: GymFindInput,
  ): Promise<GymEntityType[]> {
    const result = await this.gymService.gymAllList(args);
    return result;
  }
}
