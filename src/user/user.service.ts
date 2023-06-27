import { Injectable } from '@nestjs/common';
import { UserCreateInput } from './input/create.input';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserType } from './type/create.type';
import { LoginInput } from '../auth/input/login.input';
import { LoginOutput } from '../auth/type/login.type';
import { GoogleLoginInput } from '../auth/input/google.input';
import {
  UserEntity,
  UserLoginType,
  UserRole,
} from '../repositories/entities/user.entity';

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

  async userCheckService(userId: string): Promise<UserEntity> {
    const checkId = await this.userRepository.findUserAsId(userId);
    return checkId;
  }

  async userCheckAsEmail(email: string): Promise<any> {
    const checkEmail = await this.userRepository.findUserAsEmail(email);
    return checkEmail;
  }
}
