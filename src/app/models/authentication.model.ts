export interface Token {
  access_token: string;
  token_type: string;
}

export interface LoginDto {
  email: string;
  password: string;
}
