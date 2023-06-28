import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { IOGoogleAuthUser } from '../interface/social.interface';
import { LoginOutput } from '../auth/type/login.type';
import { AuthService } from './auth.service';
import { DynamicAuthGuard } from './guards/dynamic-auth.guard';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get(':social')
  // @UseGuards(AuthGuard('google'))
  @UseGuards(DynamicAuthGuard)
  async LoginOAuth(
    @Req() req: Request & IOGoogleAuthUser,
    @Res() res: Response,
  ): Promise<LoginOutput> {
    console.log('ㄴ');
    const result = await this.authService.socialLogin(req, res);
    return result;
  }
}
