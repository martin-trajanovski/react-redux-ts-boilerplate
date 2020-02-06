export interface AuthToken {
  token: string;
  expiresIn: number;
}

export interface TokenDataInterface {
  authToken: AuthToken;
  refreshToken: string;
}

export type AuthorizationHeader = {
  Authorization: string;
};
