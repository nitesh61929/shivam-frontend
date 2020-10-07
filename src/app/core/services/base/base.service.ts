import { HttpClient } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { StorageService } from "../storage";

@Injectable({
  providedIn: "root",
})
export class BaseService {
  protected storage: StorageService;
  protected http: HttpClient;

  constructor(protected injector: Injector) {
    // const injector = AppInjector.getInjector();
    this.storage = injector.get(StorageService);
    this.http = injector.get(HttpClient);
  }
}
