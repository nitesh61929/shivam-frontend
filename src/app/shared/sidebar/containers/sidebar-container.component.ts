import { Component, Injector, OnInit } from "@angular/core";
import { BaseComponent } from "@core/components/base";
import { IMenuItem } from "../interfaces";
import { SidebarService } from "../services";

@Component({
  selector: "app-sidebar-container",
  templateUrl: "./sidebar-container.component.html",
})
export class SidebarContainerComponent extends BaseComponent implements OnInit {
  menuLists: IMenuItem[];

  constructor(injector: Injector, private sidebarService: SidebarService) {
    super(injector);
  }

  ngOnInit(): void {
    this.menuLists = this.sidebarService.menuLists;
  }
}
