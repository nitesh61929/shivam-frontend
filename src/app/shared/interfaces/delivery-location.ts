import { IDistrict } from "./district";
import { IProvince } from "./province";

export interface IDeliveryLocation {
  id: number;
  name: string;
  province_id: number;
  district_id: number;
  district?: IDistrict;
  province?: IProvince;
  delivery_charge: number;
}
