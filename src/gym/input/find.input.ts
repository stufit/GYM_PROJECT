import { InputType } from '@nestjs/graphql';
import { ListInput } from '../../common/list/input/list.input';

@InputType('GYM_FIND_INPUT')
export class GymFindInput extends ListInput {}
