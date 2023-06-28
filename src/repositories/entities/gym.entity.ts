import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { UserEntityType } from '../../user/type/user-entity.type';

@Entity({ name: 'GYM_MASTER' })
export class GymEntity {
  @PrimaryGeneratedColumn({
    name: 'GYM_NO',
    type: 'bigint',
    comment: '사업장 고유키',
  })
  gymNo: string;

  @Column({
    name: 'GYM_NM',
    type: 'varchar',
    nullable: false,
    comment: '사업장명',
  })
  gymNm: string;

  @Column({
    name: 'ADDRESS',
    type: 'varchar',
    nullable: false,
    comment: '사업장 주소',
  })
  address: string;

  @Column({
    name: 'STATE',
    type: 'varchar',
    nullable: false,
    comment: '시',
  })
  state: string;

  @Column({
    name: 'CITY',
    type: 'varchar',
    nullable: false,
    comment: '도시명',
  })
  city: string;

  @Column({
    name: 'ZIP_CODE',
    type: 'varchar',
    nullable: false,
    comment: '우편번호',
  })
  zipCode: string;

  @Column({
    name: 'GYM_PHONE_NUMBER',
    type: 'varchar',
    nullable: false,
    comment: '사업장 연락처',
  })
  gymPhoneNumber: string;

  @Column({
    name: 'GYM_EMAIL',
    type: 'varchar',
    nullable: false,
    comment: '사업장 이메일',
  })
  gymEmail: string;

  @Column({
    name: 'GYM_WEBSITE',
    type: 'varchar',
    nullable: false,
    comment: '사업장 웹사이트',
  })
  gymWebsite: string;

  @Column({
    name: 'GYM_OPERATING_TIME',
    type: 'varchar',
    nullable: false,
    comment: '사업장 운영시간',
  })
  gymOperatingTime: string;

  @Column({
    name: 'FACILITIES',
    type: 'varchar',
    nullable: false,
    comment: '사업장 시설',
  })
  facilities: string;

  @Column({
    name: 'GYM_SIZE',
    type: 'varchar',
    nullable: false,
    comment: '사업장 규모',
  })
  gymSize: string;

  @Column({
    name: 'GYM_COST',
    type: 'varchar',
    nullable: false,
    comment: '시설 이용 가격',
  })
  gymCost: string;

  @Column({
    name: 'PT_AVAILABLE',
    type: 'varchar',
    nullable: false,
    comment: '사업장 규모',
    default: 'N',
  })
  ptAvailable: string;

  @Column({
    name: 'PT_COST',
    type: 'varchar',
    nullable: false,
    comment: 'PT 가격',
  })
  ptCost: string;

  @ManyToOne(() => UserEntity, (user) => user.gyms)
  @JoinColumn({ name: 'USER_NO' })
  gymOwner: UserEntity;
}
