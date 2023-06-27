import { ILocalAuthUser } from '../../interface/social.interface';

export interface IContext {
  req: Request & ILocalAuthUser;
  res: Response;
}
