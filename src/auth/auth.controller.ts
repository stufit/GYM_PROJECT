import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IOGoogleAuthUser } from './interface/social.interface';
import { LoginOutput } from '../auth/type/login.type';
import { AuthService } from './auth.service';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('google'))
  @Get('google')
  async googleLogin(
    @Req() req: Request & IOGoogleAuthUser,
  ): Promise<LoginOutput> {
    const result = await this.authService.googleLogin(req);
    return result;
  }
}
