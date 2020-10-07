import { IDistrict } from "./district";

export interface IProvinceDistricts {
  id: number;
  name: string;
  districts: IDistrict[];
}
