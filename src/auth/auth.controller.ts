import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { IOGoogleAuthUser } from '../interface/social.interface';
import { LoginOutput } from '../auth/type/login.type';
import { AuthService } from './auth.service';
import axios from 'axios';
import * as process from 'process';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('google'))
  @Get('google')
  async googleLogin(
    @Req() req: Request & IOGoogleAuthUser,
    @Res() res: Response,
  ): Promise<LoginOutput> {
    const result = await this.authService.socialLogin(req, res);
    return result;
  }

  @UseGuards(AuthGuard('naver'))
  @Get('naver')
  async naverLogin(
    @Req() req: Request & IOGoogleAuthUser,
    @Res() res: Response,
  ): Promise<LoginOutput> {
    const result = await this.authService.socialLogin(req, res);
    return result;
  }
  @UseGuards(AuthGuard('kakao'))
  @Get('kakao')
  async kakaoLogin(
    @Req() req: Request & IOGoogleAuthUser,
    @Res() res: Response,
  ) {
    const result = await this.authService.socialLogin(req, res);
    console.log(result);
    return result;
  }
}
