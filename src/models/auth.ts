export interface ILoginParams {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ILoginFormValues {
  username: string;
  password: string;
}

export interface ILoginValidation {
  email: string;
  password: string;
}
