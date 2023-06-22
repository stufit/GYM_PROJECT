import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@ObjectType('GYM_MASTER', { description: '사업장정보(GYM_MASTER)' })
@Entity({ name: 'GYM_MASTER' })
export class GymEntity {
  @Field(() => Int, { nullable: false, description: '사업장 키' })
  @PrimaryGeneratedColumn({
    name: 'GYM_NO',
    type: 'integer',
    comment: '사업장 고유키',
  })
  gymNo: number;

  @Field(() => String, { nullable: true, description: '사업장명' })
  @Column({
    name: 'GYM_NM',
    type: 'varchar',
    nullable: false,
    comment: '사업장명',
  })
  gymNm: string;

  @Field(() => String, { nullable: true, description: '사업장 주소' })
  @Column({
    name: 'ADDRESS',
    type: 'varchar',
    nullable: false,
    comment: '사업장 주소',
  })
  address: string;

  @Field(() => String, { nullable: true, description: '시,군,구' })
  @Column({
    name: 'STATE',
    type: 'varchar',
    nullable: false,
    comment: '시',
  })
  state: string;

  @Field(() => String, { nullable: true, description: '도시명' })
  @Column({
    name: 'CITY',
    type: 'varchar',
    nullable: false,
    comment: '도시명',
  })
  city: string;

  @Field(() => String, { nullable: true, description: '우편번호' })
  @Column({
    name: 'ZIP_CODE',
    type: 'varchar',
    nullable: false,
    comment: '우편번호',
  })
  zipCode: string;

  @Field(() => String, { nullable: true, description: '사업장 연락처' })
  @Column({
    name: 'GYM_PHONE_NUMBER',
    type: 'varchar',
    nullable: false,
    comment: '사업장 연락처',
  })
  gymPhoneNumber: string;

  @Field(() => String, { nullable: true, description: '사업장 이메일' })
  @Column({
    name: 'GYM_EMAIL',
    type: 'varchar',
    nullable: false,
    comment: '사업장 이메일',
  })
  gymEmail: string;

  @Field(() => String, { nullable: true, description: '사업장 웹사이트' })
  @Column({
    name: 'GYM_WEBSITE',
    type: 'varchar',
    nullable: false,
    comment: '사업장 웹사이트',
  })
  gymWebsite: string;

  @Field(() => String, { nullable: true, description: '사업장 운영시간' })
  @Column({
    name: 'GYM_OPERATING_TIME',
    type: 'varchar',
    nullable: false,
    comment: '사업장 운영시간',
  })
  gymOperatingTime: string;

  @Field(() => String, { nullable: true, description: '사업장 시설' })
  @Column({
    name: 'FACILITIES',
    type: 'varchar',
    nullable: false,
    comment: '사업장 시설',
  })
  facilities: string;

  @Field(() => String, { nullable: true, description: '사업장 규모' })
  @Column({
    name: 'GYM_SIZE',
    type: 'varchar',
    nullable: false,
    comment: '사업장 규모',
  })
  gymSize: string;

  @Field(() => String, { nullable: true, description: '시설 이용 가격' })
  @Column({
    name: 'GYM_COST',
    type: 'varchar',
    nullable: false,
    comment: '시설 이용 가격',
  })
  gymCost: string;

  @Field(() => String, { nullable: true, description: 'PT 서비스 유무' })
  @Column({
    name: 'PT_AVAILABLE',
    type: 'varchar',
    nullable: false,
    comment: '사업장 규모',
    default: 'N',
  })
  ptAvailable: string;

  @Field(() => String, { nullable: true, description: 'PT 가격' })
  @Column({
    name: 'PT_COST',
    type: 'varchar',
    nullable: false,
    comment: 'PT 가격',
  })
  ptCost: string;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.gyms)
  @JoinColumn({ name: 'USER_NO' })
  gymOwner: UserEntity;
}
