import { Component, Injector, Input, OnInit } from "@angular/core";
import { BaseComponent } from "@core/components/base";
import { IMenuItem } from "../interfaces";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent extends BaseComponent implements OnInit {
  @Input() menuLists: IMenuItem[];
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {}

  goTo(route: string) {
    this.redirectTo(route);
  }
}
