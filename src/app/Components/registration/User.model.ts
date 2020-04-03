export class UserModel {
  id: number;
  email: string;
  password: {
    pwd: string;
    confirmPwd: string;
  };
  terms: boolean;

  constructor(values: Object = {}) {
    // Constructor initialization
    Object.assign(this, values);
  }

}

