import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInput } from './input/login.input';
import { LoginOutput } from './type/login.type';
import { AuthService } from './auth.service';
import { IContext } from '../common/interface/req.interface';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginOutput, {})
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() ctx: IContext,
  ): Promise<LoginOutput> {
    const result = await this.authService.loginService(loginInput, ctx);
    return result;
  }

  @UseGuards(GqlAuthGuard('refresh'))
  @Mutation(() => String)
  async restoreAccessToken(@Context() ctx: IContext) {
    const result = this.authService.restoreAccessToken(ctx.req);
    return result;
  }
}
