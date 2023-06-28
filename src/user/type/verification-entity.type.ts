import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('VERIFICATION_ENTITY_TYPE', { description: '검증키(VERIFICATION)' })
export class VerificationEntityType {
  @Field((type) => Int, {
    name: 'VERIFICATION_NO',
    nullable: false,
    description: '검증키',
  })
  verificationNo: number;

  @Field(() => Int, { name: 'USER_NO', nullable: false, description: '유저키' })
  userNo: number;

  @Field((type) => String, { name: 'CODE', description: '코드' })
  code: string;

  @Field(() => Date, { name: 'CREATED_AT', description: '생성일자' })
  createdAt: Date;

  @Field(() => Date, { name: 'UPDATED_AT', description: '수정일자' })
  updatedAt: Date;
}
