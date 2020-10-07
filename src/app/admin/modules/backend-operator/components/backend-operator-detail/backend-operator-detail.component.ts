import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { BaseComponent } from "@core/components";
import { IBackendOperator } from "../../interfaces";

@Component({
  selector: "app-backend-operator-detail",
  templateUrl: "./backend-operator-detail.component.html",
})
export class BackendOperatorDetailComponent extends BaseComponent
  implements OnInit {
  @Output() backClicked: EventEmitter<null> = new EventEmitter<null>();
  @Output() editBackendOperator: EventEmitter<number> = new EventEmitter<
    number
  >();
  @Input() backendOperatorDetail: IBackendOperator;
  displayedColumns: string[] = ["module_name", "method_name"];
  dataSource: MatTableDataSource<any>;
  modulesWithMethods = [];

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.setModuleWithMethods();
    this.dataSource = new MatTableDataSource(this.modulesWithMethods);
  }

  setModuleWithMethods() {
    Object.entries(this.backendOperatorDetail.permissions).forEach(
      ([key, values]) => {
        const translatedKey = this.translateService.instant(key.toLowerCase());
        const translatedValues = values.map((value) =>
          this.translateService.instant(value.toLowerCase())
        );
        const obj = {
          module: translatedKey,
          methods: translatedValues,
        };
        this.modulesWithMethods.push(obj);
      }
    );
  }

  onBackClick() {
    this.backClicked.emit();
  }

  onEdit() {
    this.editBackendOperator.emit(this.backendOperatorDetail.id);
  }
}
