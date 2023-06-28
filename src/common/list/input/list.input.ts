import { Field, InputType } from '@nestjs/graphql';
import { PagingInput } from './paging.input';

@InputType('COMMON_LIST_INPUT')
export class ListInput {
  @Field(() => PagingInput, {
    nullable: true,
  })
  pagingArgs?: PagingInput;

  @Field(() => String, { nullable: true })
  searchText?: string;
}
