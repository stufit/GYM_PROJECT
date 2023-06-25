import { Mutation, Resolver } from '@nestjs/graphql';
import { GymService } from './gym.service';
import { CreateGymOutput } from './type/create.type';

@Resolver()
export class GymResolver {
  constructor(private readonly gymService: GymService) {}

  // 1. 헬스장 생성
  // @Mutation(() => CreateGymOutput)
  // async createGym() {
  //   return;
  // }
}
