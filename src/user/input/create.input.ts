import { Field, InputType } from '@nestjs/graphql';
import {
  UserLoginType,
  UserRole,
} from '../../repositories/entities/user.entity';
import { IsEnum } from 'class-validator';
@InputType('UserCreateInput')
export class UserCreateInput {
  @Field(() => String, { nullable: true, description: '유저명' })
  name: string;

  @Field(() => String, { nullable: true, description: '유저 아이디' })
  userId: string;

  @Field(() => String, { nullable: true, description: '비밀번호' })
  password: string;

  @IsEnum(UserRole)
  @Field(() => UserRole, {
    defaultValue: UserRole.User,
    description: '유저 역할',
  })
  role: UserRole;

  @Field(() => String, { nullable: true, description: '유저 이메일' })
  userEmail: string;

  @IsEnum(UserLoginType)
  @Field(() => UserLoginType, {
    defaultValue: UserLoginType.Local,
    description: '유저 로그인 유형',
  })
  loginType: UserLoginType;
}
