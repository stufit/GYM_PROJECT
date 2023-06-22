import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { UserEntity } from '../repositories/entities/user.entity';
import { UserService } from './user.service';
import { UserCreateInput } from './input/create.input';
import { CreateUserType } from './type/create.type';
import { LoginOutput } from './type/login.type';
import { LoginInput } from './input/login.input';
import { GoogleLoginInput } from './input/google.input';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
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

  // 4. 로그인
  @Mutation(() => LoginOutput)
  async loginUser(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<LoginOutput> {
    const result = await this.userService.loginUser(loginInput);
    return result;
  }
}
