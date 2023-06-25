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
        console.log(req);
        const cookie = req.headers.cookie; // refreshToken=asdlkfjqlkjwfdjkl
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: process.env.JWT_REFRESH_TOKEN,
    });
  }

  validate(payload) {
    console.log(payload); // { sub: asdkljfkdj(유저ID) }

    return {
      id: payload.userId,
    };
  }
}
