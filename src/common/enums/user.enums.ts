import { registerEnumType } from '@nestjs/graphql';

export enum UserLoginType {
  Local = 'LOCAL',
  Google = 'GOOGLE',
  Kakao = 'KAKAO',
  Naver = 'NAVER',
}
export enum UserRole {
  User = 'USER',
  Admin = 'ADMIN',
}

export const registerUserEnums = () => {
  registerEnumType(UserLoginType, { name: 'UserLoginType' });
  registerEnumType(UserRole, { name: 'UserRole' });
};
