import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  private currentStorage = environment.storage;

  private storageSub = new Subject<string>();

  constructor() {}

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  get(key: string) {
    // this.storageSub.next("changed");
    return JSON.parse(this.currentStorage.getItem(key));
  }

  set(key: string, value: any) {
    this.storageSub.next("changed");

    return this.currentStorage.setItem(key, JSON.stringify(value));
  }

  clear() {
    this.currentStorage.clear();
  }
}
