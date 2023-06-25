import { ILocalAuthUser } from '../../auth/interface/social.interface';

export interface IContext {
  req: Request & ILocalAuthUser;
  res: Response;
}
