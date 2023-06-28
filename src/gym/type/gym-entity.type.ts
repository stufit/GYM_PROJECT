import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserEntityType } from '../../user/type/user-entity.type';

@ObjectType('GYM_MASTER', { description: '사업장정보(GYM_MASTER)' })
export class GymEntityType {
  @Field(() => Number, {
    name: 'GYM_NO',
    nullable: false,
    description: '사업장 키',
  })
  gymNo: string;

  @Field(() => String, {
    name: 'GYM_NM',
    nullable: true,
    description: '사업장명',
  })
  gymNm: string;
  @Field(() => String, {
    name: 'ADDRESS',
    nullable: true,
    description: '사업장 주소',
  })
  address: string;
  @Field(() => String, {
    name: 'STATE',
    nullable: true,
    description: '시,군,구',
  })
  state: string;

  @Field(() => String, { name: 'CITY', nullable: true, description: '도시명' })
  city: string;

  @Field(() => String, {
    name: 'ZIP_CODE',
    nullable: true,
    description: '우편번호',
  })
  zipCode: string;
  @Field(() => String, {
    name: 'GYM_PHONE_NUMBER',
    nullable: true,
    description: '사업장 연락처',
  })
  gymPhoneNumber: string;
  @Field(() => String, {
    name: 'GYM_EMAIL',
    nullable: true,
    description: '사업장 이메일',
  })
  gymEmail: string;
  @Field(() => String, {
    name: 'GYM_WEBSITE',
    nullable: true,
    description: '사업장 웹사이트',
  })
  gymWebsite: string;
  @Field(() => String, {
    name: 'GYM_OPERATING_TIME',
    nullable: true,
    description: '사업장 운영시간',
  })
  gymOperatingTime: string;
  @Field(() => String, {
    name: 'FACILITIES',
    nullable: true,
    description: '사업장 시설',
  })
  facilities: string;
  @Field(() => String, {
    name: 'GYM_SIZE',
    nullable: true,
    description: '사업장 규모',
  })
  gymSize: string;
  @Field(() => String, {
    name: 'GYM_COST',
    nullable: true,
    description: '시설 이용 가격',
  })
  gymCost: string;
  @Field(() => String, {
    name: 'PT_AVAILABLE',
    nullable: true,
    description: 'PT 서비스 유무',
  })
  ptAvailable: string;
  @Field(() => String, {
    name: 'PT_COST',
    nullable: true,
    description: 'PT 가격',
  })
  ptCost: string;
  @Field(() => UserEntityType, {
    name: 'USER_NO',
    nullable: true,
    description: '사업장 소유자',
  })
  gymOwner: UserEntityType;
}
