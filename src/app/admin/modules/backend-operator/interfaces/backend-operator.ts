import { IPermissions } from "@core/interfaces/permission";
import { IBackendOperatorDetail } from "./backend-operator-detail";

export interface IBackendOperator {
  id: number;
  mobile_number: number;
  username: string;
  password: string;
  password_confirmation: string;
  details: IBackendOperatorDetail;
  permissions: IPermissions;
}
