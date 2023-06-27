// jwt-refresh.strategy.ts

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// import { KakaoStrategy } from 'passport-kakao'
// import { NaverStrategy } from 'passport-naver'
// import { GoogleStrategy } from 'passport-google'

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie; // refreshToken=asdlkfjqlkjwfdjkl
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: process.env.JWT_REFRESH_TOKEN,
    });
  }

  validate(payload) {
    console.log('리프레시페이로드', payload); // { sub: asdkljfkdj(유저ID) }
    return {
      userId: payload.userId,
      name: payload.name,
      email: payload.email,
    };
  }
}
