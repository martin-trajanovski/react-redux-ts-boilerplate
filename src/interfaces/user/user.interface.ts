export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address?: {
    city: string;
    country: string;
    street: string;
  };
}
