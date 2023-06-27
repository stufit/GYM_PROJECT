import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-naver-v2';
import { ConfigService } from '@nestjs/config';
import { IOGoogleAuthUser } from '../../interface/social.interface';
import { Injectable } from '@nestjs/common';
import * as process from 'process';
@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: 'NS7wJJSStdrujZIv6bu2',
      clientSecret: '7uDRXb3xLI',
      callbackURL: 'http://localhost:3010/login/naver',
      scope: ['email', 'name', 'birthyear', 'mobile'],
    });
  }
  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): IOGoogleAuthUser {
    return {
      name: profile.name,
      email: profile.email,
      hashedPassword: 'sadfsadf',
      provider: profile.provider,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
