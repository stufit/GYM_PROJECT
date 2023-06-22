import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { IOGoogleAuthUser } from './interface/social.interface';
import { LoginOutput } from './type/login.type';

@Controller('login')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('google'))
  @Get('google')
  async googleLogin(
    @Req() req: Request & IOGoogleAuthUser,
  ): Promise<LoginOutput> {
    const result = await this.userService.googleLogin(req);
    return result;
  }
}
