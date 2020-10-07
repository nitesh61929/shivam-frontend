import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { BaseComponent } from "@core/components";
import { IPageHeaderOptions } from "../interfaces";

@Component({
  selector: "app-page-header",
  templateUrl: "./page-header.component.html",
})
export class PageHeaderComponent extends BaseComponent implements OnInit {
  @Output() addClick: EventEmitter<null> = new EventEmitter<null>();
  @Input() pageHeaderOptions: IPageHeaderOptions;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {}

  getHeaderTitle(): string {
    const title = this.pageHeaderOptions?.title
      ? this.translateService.instant(this.pageHeaderOptions.title)
      : this.translateService.instant("module_title_label");
    return title;
  }

  onAddClick() {
    this.addClick.emit();
  }
}
