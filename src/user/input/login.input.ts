import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field(() => String, { nullable: true, description: '유저 아이디' })
  userId: string;

  @Field(() => String, { nullable: true, description: '비밀번호' })
  password: string;
}
