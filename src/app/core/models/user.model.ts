export interface User {
  id?: number;
  username: string;
  firstName: string;
  lastName: string;
  status?: string;
  mail: string;
  identityDocument?: string;
  telephone?: string;
  provider?: string;
  address?: string;
  password?: string;
  creationDate?: string;
  modificationDate?: string;
}
