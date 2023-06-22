import { Injectable } from '@nestjs/common';
import { UserCreateInput } from './input/create.input';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserType } from './type/create.type';
import { LoginInput } from './input/login.input';
import { LoginOutput } from './type/login.type';
import { GoogleLoginInput } from './input/google.input';
import { UserLoginType, UserRole } from '../repositories/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async createUser(userCreateInput: UserCreateInput): Promise<CreateUserType> {
    // 1. 아이디 존재하는지 체크
    const checkId = await this.userCheckService(userCreateInput.userId);
    if (checkId) {
      return { ok: false, error: '해당 아이디는 이미 존재합니다.' };
    }
    // 2. 계정생성
    await this.userRepository.createUser(userCreateInput);
    return { ok: true };
  }

  async loginUser(loginInput: LoginInput): Promise<LoginOutput> {
    const { userId, password } = loginInput;
    // 유저 유무 체크
    const user = await this.userCheckService(userId);
    if (!user) {
      return {
        ok: false,
        error: '유저 정보가 없습니다.',
      };
    }
    //
    const passwordCorrect = await user.checkPassword(password);
    if (!passwordCorrect) {
      return {
        ok: false,
        error: '비밀번호가 틀렸습니다.',
      };
    }
    return {
      ok: true,
      error: '',
      token: 'asdfasf',
    };
    /*
    // JWT 생성
    try {
      const token = this.jwtService.sign(user.userId);
      return {
        ok: true,
        token: token,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }

     */
  }

  async userCheckService(userId: string): Promise<any> {
    const checkId = await this.userRepository.findUserAsId(userId);
    return checkId;
  }

  async userCheckAsEmail(email: string): Promise<any> {
    const checkEmail = await this.userRepository.findUserAsEmail(email);
    return checkEmail;
  }

  async googleLogin(req: any): Promise<LoginOutput> {
    const createUserInfo: UserCreateInput = {
      name: req.user.name,
      userId: req.user.email,
      password: req.user.hashedPassword,
      userEmail: req.user.email,
      role: UserRole.User,
      loginType: UserLoginType.Google,
    };
    console.log(req.user);
    const userInfo = await this.userRepository.findUserAsEmail(req.user.email);
    if (!userInfo) {
      await this.userRepository.createUser(createUserInfo);
    }
    return { ok: true, error: '', token: req.user.accessToken };
  }
}
