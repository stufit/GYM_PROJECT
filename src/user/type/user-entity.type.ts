import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

import { GymEntity } from '../../repositories/entities/gym.entity';
import { UserLoginType, UserRole } from '../../common/enums/user.enums';
import { GymEntityType } from '../../gym/type/gym-entity.type';

@ObjectType('USER_ENTITY_TYPE', { description: '사용자정보(USER)' })
export class UserEntityType {
  @Field(() => Int, { name: 'USER_NO', nullable: false, description: '유저키' })
  userNo: number;
  @Field(() => String, { name: 'NAME', nullable: true, description: '유저명' })
  name: string;
  @Field(() => String, {
    name: 'USER_ID',
    nullable: true,
    description: '유저 아이디',
  })
  userId: string;
  @Field(() => String, {
    name: 'PASSWORD',
    nullable: true,
    description: '비밀번호',
  })
  password: string;
  @Field(() => UserRole, {
    name: 'ROLE',
    defaultValue: UserRole.User,
    description: '유저 역할',
  })
  role: UserRole;
  @Field(() => UserLoginType, {
    name: 'LOGIN_TYPE',
    defaultValue: UserLoginType.Local,
    description: '유저 로그인 유형',
  })
  loginType: UserLoginType;
  @Field(() => String, {
    name: 'USER_EMAIL',
    nullable: true,
    description: '유저 이메일',
  })
  userEmail: string;
  @Field(() => String, {
    name: 'USE_YN',
    nullable: false,
    description: '사용여부',
  })
  useYn: string;
  @Field(() => Date, { name: 'CREATED_AT', description: '생성일자' })
  createdAt: Date;
  @Field(() => Date, { name: 'UPDATED_AT', description: '수정일자' })
  updatedAt: Date;

  @Field(() => [GymEntityType], {
    name: 'GYMS',
    nullable: true,
    description: '헬스장',
  })
  gyms: GymEntityType[];
}
