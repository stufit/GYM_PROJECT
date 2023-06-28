import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';
import { Injectable } from '@nestjs/common';
import * as process from 'process';
@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_REST_API_KEY,
      clientSecret: process.env.KAKAO_SECRET,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
      scope: ['account_email', 'profile_nickname', 'birthday'],
    });
  }
  validate(accessToken: string, refreshToken: string, profile: Profile) {
    return {
      name: profile.username,
      email: profile._json.kakao_account.email,
      hashedPassword: process.env.KAKAO_HASHED_PASSWORD || 'sadfsadf',
      provider: profile.provider,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
