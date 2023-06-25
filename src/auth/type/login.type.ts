import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class LoginOutput {
  @Field((type) => String, { nullable: true })
  error?: string;

  @Field((type) => Boolean)
  ok: boolean;
  @Field((type) => String, { nullable: true })
  token?: string;
}
