import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as process from 'process';

// 네이버,구글 등등 전략을 넣는다.
// import { Strategy } from 'passport-naver';
// import { Strategy } from 'passport-google-oauth20';
// import { Strategy } from 'passport-facebook';

export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'localLogin',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate(payload: any) {
    console.log('크아앙');
    return {
      userId: payload.userId,
      username: payload.name,
      email: payload.email,
    };
  }
}