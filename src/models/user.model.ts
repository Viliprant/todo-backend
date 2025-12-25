export interface User {
  id: string;
  email: string;
  password: string;
  token?: string;
}

export interface SafeUser {
  id: string;
  email: string;
  token: string;
}

export interface JwtPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}
