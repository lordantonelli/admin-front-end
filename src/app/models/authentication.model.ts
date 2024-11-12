export interface LoginData {
  access_token: string;
  token_type: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface User extends Partial<LoginData> {
  id: number;
  name: string;
  email: string;
  dateCreated: Date;
  lastUpdated: Date;
}
