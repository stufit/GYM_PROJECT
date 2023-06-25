import { Injectable } from '@nestjs/common';
import { LoginInput } from './input/login.input';
import { LoginOutput } from './type/login.type';
import { UserService } from '../user/user.service';
import { UserCreateInput } from '../user/input/create.input';
import {
  UserEntity,
  UserLoginType,
  UserRole,
} from '../repositories/entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  // 1. 로컬 로그인 서비스
  async loginService(loginInput: LoginInput, ctx): Promise<LoginOutput> {
    const { userId, password } = loginInput;
    // 1. 아이디가 일치하는 유저 DB에서 찾기
    const checkUser = await this.userService.userCheckService(userId);
    // 2. 일치하는 아이디의 유저가 없는 경우 에러
    if (!checkUser) {
      return {
        ok: false,
        error: '유저 정보가 없습니다.',
      };
    }
    // 3. 비밀번호 확인
    const passwordCorrect = await checkUser.checkPassword(password);
    if (!passwordCorrect) {
      return {
        ok: false,
        error: '비밀번호가 틀렸습니다.',
      };
    }
    // 4. 리프레시 토큰 만든 후 브라우저 쿠키에 저장
    await this.setRefreshToken(checkUser, ctx);
    // 5. JWT 생성(비번과 아이디 모두 맞는 경우)
    const getAccessToken = await this.getAccessToken(checkUser);
    return { ok: true, error: '', token: getAccessToken };
  }

  // 2. 구글 로그인 서비스
  async googleLogin(req: any): Promise<LoginOutput> {
    const createUserInfo: UserCreateInput = {
      name: req.user.name,
      userId: req.user.email,
      password: req.user.hashedPassword,
      userEmail: req.user.email,
      role: UserRole.User,
      loginType: UserLoginType.Google,
    };
    const userInfo = await this.userRepository.findUserAsEmail(req.user.email);
    if (!userInfo) {
      await this.userRepository.createUser(createUserInfo);
    }
    return { ok: true, error: '', token: req.user.accessToken };
  }

  async getAccessToken(user): Promise<any> {
    // 첫번째는 내가 넣고싶은 payload, 두번째는 secret key
    return this.jwtService.sign(
      {
        userId: user.userId,
        email: user.userEmail,
        name: user.name,
      },
      { secret: process.env.JWT_SECRET, expiresIn: '20s' },
    );
  }

  async setRefreshToken(checkUser, ctx) {
    const refreshToken = this.jwtService.sign(
      { userId: checkUser.userId },
      { secret: process.env.JWT_REFRESH_TOKEN, expiresIn: '2w' },
    );
    // 개발환경
    ctx.res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/; `);
    // 배포환경
    /*
    ctx.res.headers.setHeader(
      'Set-Cookie',
      `refreshToken=${refreshToken}; path=/; domain=.domain.com; SameSite=None; Secure; httpOnly; `,
    );
    // ctx.res.setHeader('Access-Control-Allow-Origin', 'https://프론트엔드도메인');
     */
    return refreshToken;
  }

  async restoreAccessToken(req): Promise<any> {
    return this.getAccessToken(req);
  }
}
