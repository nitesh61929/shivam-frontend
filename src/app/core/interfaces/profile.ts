export interface IProfile {
  id: number;
  mobile_number: string;
  role: string;
  status: number;
  username: string;
  details: IProfileDetail;
}

interface IProfileDetail {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  street: string;
  city: string;
  district: string;
  state: string;
}
