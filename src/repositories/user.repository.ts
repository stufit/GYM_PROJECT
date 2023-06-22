import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserCreateInput } from '../user/input/create.input';
import { VerificationEntity } from './entities/verification.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(VerificationEntity)
    private readonly verification: Repository<VerificationEntity>,
  ) {}

  // 1. 아이디 존재유무 체크
  async findUserAsId(userId: string) {
    return this.userRepository
      .createQueryBuilder()
      .where(`USER_ID = '${userId}'`)
      .andWhere(`USE_YN='y'`)
      .getOne();
  }

  async findUserAsEmail(email: string) {
    return this.userRepository
      .createQueryBuilder()
      .where(`USER_EMAIL = '${email}'`)
      .andWhere(`USE_YN='y'`)
      .getOne();
  }

  // 2. 계정생성
  async createUser(userCreateInput: UserCreateInput) {
    const user = await this.userRepository.save(
      this.userRepository.create(userCreateInput),
    );
    return await this.verification.save(this.verification.create({ user }));
  }
}
