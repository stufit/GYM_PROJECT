import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { UserEntity } from '../repositories/entities/user.entity';
import { UserService } from './user.service';
import { UserCreateInput } from './input/create.input';
import { CreateUserType } from './type/create.type';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { IContext } from '../common/interface/req.interface';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GqlAuthGuard('localLogin'))
  @Query(() => String)
  fetchUser(@Context() ctx: IContext): string {
    return '인가에 성공했습니다.';
  }

  // 1. 유저 리스트
  @Query((returns) => UserEntity)
  async userList() {
    return;
  }
  // 2. 유저 상세정보
  @Query(() => UserEntity)
  async userDetail(@Args('email') email: string) {
    const result = await this.userService.userCheckAsEmail(email);
    return result;
  }

  // 3. 유저 생성
  @Mutation(() => CreateUserType)
  async createUser(
    @Args('userCreateInput') userCreateInput: UserCreateInput,
  ): Promise<CreateUserType> {
    const result = await this.userService.createUser(userCreateInput);
    return result;
  }
}
