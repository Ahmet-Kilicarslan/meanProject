

export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
  email: string;

}

export interface loginRequest{
  username: string;
  password: string;
}
export interface loginResponse {
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
  token: string;
  message?: string;
}

export interface registerRequest{
  username: string;
  password: string;
  email: string;
}
