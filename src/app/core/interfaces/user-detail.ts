import { IDistrict, IProvince } from "@shared/interfaces";

export interface IUserDetail {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  street: string;
  city: string;
  district: string;
  state: string;
  pan_no: string;
  billing_name: string;
  districtData?: IDistrict;
  stateData?: IProvince;
}
