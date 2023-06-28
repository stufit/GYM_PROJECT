import { Field, InputType, Int } from '@nestjs/graphql';

@InputType('COMMON_PAGING_INPUT')
export class PagingInput {
  @Field(() => Int, { nullable: false, defaultValue: 50 })
  limit: number;

  @Field(() => Int, { nullable: false, defaultValue: 1 })
  page: number;
}
