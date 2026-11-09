export type LoginForm = {
  email: string;
  password: string;
};

export type RegisterForm = {
  name: string;
  email: string;
  password: string;
  confirm: string;
};

export type Customer = {
  id: string;
  fullname: string;
  birthdate: string;
  address: string;
  phoneNumber: string;
  email: string;
  role: string;
};

export type LoginResponse = {
  token: string;
  customer: Customer;
};
