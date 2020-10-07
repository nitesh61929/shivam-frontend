import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { AppPermissions } from "@core/enums";
import { IPageHeaderOptions } from "@shared/page-header";

@Component({
  selector: "app-backend-operator",
  templateUrl: "./backend-operator.component.html",
})
export class BackendOperatorComponent implements OnInit {
  @Output() addBackendOperator: EventEmitter<null> = new EventEmitter<null>();

  pageHeaderOptions: IPageHeaderOptions;
  hasListAccess = AppPermissions.LIST_BACKEND_OPERATOR;

  constructor() {}

  ngOnInit(): void {
    this.pageHeaderOptions = {
      title: "backend_operator",
      showAddBtn: true,
      hasAddAccess: AppPermissions.ADD_BACKEND_OPERATOR,
    };
  }

  onAddBackendOperator() {
    this.addBackendOperator.emit();
  }
}
