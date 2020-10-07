import { Injectable, Injector } from "@angular/core";

@Injectable()
export class AppInjector {
  private static _injector: Injector;

  static set injector(injector: Injector) {
    this._injector = injector;
  }

  static get injector(): Injector {
    return this._injector;
  }

  // private static injector: Injector;

  // static setInjector(injector: Injector) {
  //   AppInjector.injector = injector;
  // }

  // static getInjector(): Injector {
  //   return AppInjector.injector;
  // }
}
