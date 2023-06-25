import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IsEnum, Length } from 'class-validator';
import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { GymEntity } from './gym.entity';
import { Exclude } from 'class-transformer';

export enum UserLoginType {
  Local = 'LOCAL',
  Google = 'GOOGLE',
  Kakao = 'KAKAO',
  Naver = 'NAVER',
}
export enum UserRole {
  User = 'USER',
  Admin = 'ADMIN',
}

// graphql용
registerEnumType(UserLoginType, { name: 'UserEnrollType' });
registerEnumType(UserRole, { name: 'UserRole' });

@ObjectType('HEALTH_USER', { description: '헬스어플 유저' })
@Entity({ name: 'USER' })
export class UserEntity {
  @Field(() => Int, { nullable: false, description: '유저키' })
  @PrimaryGeneratedColumn({ name: 'USER_NO' })
  userNo: number;

  @Field(() => String, { nullable: true, description: '유저명' })
  @Column({ name: 'USER_NAME' })
  @Length(5, 10)
  name: string;

  @Field(() => String, { nullable: true, description: '유저 아이디' })
  @Column({ name: 'USER_ID' })
  @Length(3, 15)
  userId: string;

  @Exclude()
  @Field(() => String, { nullable: true, description: '비밀번호' })
  @Column({ name: 'PASSWORD' })
  @Length(5, 20)
  password: string;

  @IsEnum(UserRole)
  @Field(() => UserRole, {
    defaultValue: UserRole.User,
    description: '유저 역할',
  })
  @Column({
    name: 'ROLE',
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
    nullable: false,
  })
  role: UserRole;

  @IsEnum(UserLoginType)
  @Field(() => UserLoginType, {
    defaultValue: UserLoginType.Local,
    description: '유저 로그인 유형',
  })
  @Column({
    name: 'LOGIN_TYPE',
    type: 'enum',
    enum: UserLoginType,
    default: UserLoginType.Local,
    nullable: false,
  })
  loginType: UserLoginType;

  @Field(() => String, { nullable: true, description: '유저 이메일' })
  @Column({ name: 'USER_EMAIL' })
  userEmail: string;

  @Field(() => String, { nullable: false, description: '사용여부' })
  @Column({ name: 'USE_YN', default: 'Y' })
  useYn: string;

  @Field(() => Date, { description: '생성일자' })
  @CreateDateColumn({ type: 'timestamp', name: 'CREATED_AT' })
  createdAt: Date;

  @Field(() => Date, { description: '수정일자' })
  @UpdateDateColumn({ type: 'timestamp', name: 'UPDATED_AT' })
  updatedAt: Date;

  @Field(() => String, { nullable: true, description: '테스트' })
  test: string;

  @Field(() => [GymEntity])
  @OneToMany(() => GymEntity, (gym) => gym.gymOwner)
  gyms: GymEntity[];

  // 해시함수화
  @BeforeInsert() // 새로 생성시
  @BeforeUpdate() // 업데이트 시
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(aPasswrod: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPasswrod, this.password);
      return ok;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
