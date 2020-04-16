export class UserModel {
  id: number;
  email: string;
  password: string;
  repeatPassword: string;
  terms: boolean;
  constructor(values: Object = {}) {
    // Constructor initialization
    Object.assign(this, values);
  }

}

