export interface IOGoogleAuthUser {
  name: string;
  email: string;
  hashedPassword: string;
  accessToken: string;
  refreshToken: string;
}

export interface ILocalAuthUser {
  userId: string;
  username: string;
  email: string;
  accessToken: string;
}
