import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { BaseComponent } from "@core/components";
import { IDetailOptions } from "./interfaces/detail-options";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
})
export class DetailComponent extends BaseComponent implements OnInit {
  @Output() editClick: EventEmitter<null> = new EventEmitter<null>();
  @Output() backClick: EventEmitter<null> = new EventEmitter<null>();
  @Input() detailOptions: IDetailOptions;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {}

  onEditClick() {
    this.editClick.emit();
  }

  onBackClick() {
    this.backClick.emit();
  }

  getHeaderTitle(): string {
    const headerTitle = this.detailOptions?.headerTitle
      ? this.translateService.instant(this.detailOptions.headerTitle)
      : this.translateService.instant("detail_title_label");
    return headerTitle;
  }
}
