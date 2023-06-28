import { InputType } from '@nestjs/graphql';

@InputType('CREATE_GYM_INPUT', { description: '사업장 생성' })
export class CreateGymInput {}
