declare interface ILoginRequest {
  email: string;
  password: string;
}

declare interface ILoginResponse {
  success: boolean;
  message: string;
  data: {
    token: {
      type: string;
      token: string;
    };
    user: {
      id: number;
      firstName: string;
      lastName: string;
      phoneNumber: string;
      email: string;
      role: string;
      created_at: Date;
      updated_at: Date;
    };
  };
}

declare interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
  hasOrganization: boolean;
  organization_id: string | number;
}

declare interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
  hasOrganization: boolean;
  organization_id: string | number;
}

declare interface IRegisterResponse {
  success?: boolean;
  message?: string;
  data: {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    role: string;
    hasOrganization: boolean | number;
    organization_id: string | null;
    created_at: string;
    updated_at: string;
  };
}
// declare interface IForgotPassword {
//   email: string;
// }

// declare interface IResetPassword {
//   password: string;
//   confirmPassword: string;
// }

declare interface IGetSingleUserResponse {
  success?: boolean;
  message?: string;
  data: {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    role: string;
    hasOrganization: boolean | number;
    organization_id: string | null;
    created_at: string;
    updated_at: string;
  };
}

declare interface IGetAllUsersResponse {
  success?: boolean;
  message?: string;
  data: {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    role: string;
    created_at: string;
    updated_at: string;
  }[];
}
