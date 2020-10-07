import { Injectable, Injector } from "@angular/core";
import { ApiUrls } from "@core/enums";
import { BaseService } from "@core/services";
import CommonUtilities from "@core/utilities/common-utilities";
import { IDocument } from "../../../admin/modules/documents/interfaces";

@Injectable({
  providedIn: "root",
})
export class DocumentsService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }

  updateDocument(documentPayload: IDocument) {
    return this.http.post(
      ApiUrls.DOCUMENTS,
      CommonUtilities.toFormData(documentPayload)
    );
  }

  getDocuments(parameters: any) {
    return this.http.get(ApiUrls.DOCUMENTS, { params: parameters });
  }
}
