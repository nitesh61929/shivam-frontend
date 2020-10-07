import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { AppPermissions } from "@core/enums";
import { IAction } from "@shared/actions";
import { Observable } from "rxjs";
import { ITaxation } from "../../interfaces";

@Component({
  selector: "app-taxation-list",
  templateUrl: "./taxation-list.component.html",
})
export class TaxationListComponent implements OnInit {
  @Output() taxationEdit: EventEmitter<number> = new EventEmitter<number>();

  @Input() taxationList$: Observable<ITaxation[]>;
  @Input() loading$: Observable<boolean>;
  @Input() error$: Observable<Error>;

  dataSource: MatTableDataSource<ITaxation>;
  displayedColumns: string[] = ["title", "value", "actions"];
  actions: IAction[] = [
    { name: "edit", hasAccess: AppPermissions.EDIT_TAXATION },
  ];

  constructor() {}

  ngOnInit(): void {
    this.taxationList$.subscribe((taxationList: ITaxation[]) => {
      this.dataSource = new MatTableDataSource(taxationList);
    });
  }

  onActionClick(action: string, taxationId: number) {
    switch (action) {
      case "edit": {
        this.taxationEdit.emit(taxationId);
        break;
      }
    }
  }
}
