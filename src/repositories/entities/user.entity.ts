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
import { UserLoginType, UserRole } from '../../common/enums/user.enums';

// graphql용

@Entity({ name: 'USER' })
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'USER_NO' })
  userNo: number;

  @Column({ name: 'USER_NAME' })
  @Length(5, 10)
  name: string;

  @Column({ name: 'USER_ID' })
  @Length(3, 15)
  userId: string;

  @Exclude()
  @Column({ name: 'PASSWORD' })
  @Length(5, 20)
  password: string;

  @IsEnum(UserRole)
  @Column({
    name: 'ROLE',
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
    nullable: false,
  })
  role: UserRole;

  @IsEnum(UserLoginType)
  @Column({
    name: 'LOGIN_TYPE',
    type: 'enum',
    enum: UserLoginType,
    default: UserLoginType.Local,
    nullable: false,
  })
  loginType: UserLoginType;

  @Column({ name: 'USER_EMAIL' })
  userEmail: string;

  @Column({ name: 'USE_YN', default: 'Y' })
  useYn: string;

  @CreateDateColumn({ type: 'timestamp', name: 'CREATED_AT' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'UPDATED_AT' })
  updatedAt: Date;

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
