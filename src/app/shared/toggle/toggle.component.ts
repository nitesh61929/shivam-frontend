import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { BaseComponent } from "@core/components";
import { IToggleOptions } from "./interfaces";

@Component({
  selector: "app-toggle",
  templateUrl: "./toggle.component.html",
})
export class ToggleComponent extends BaseComponent implements OnInit {
  @Output() toggled: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() listenCheckbox: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() value: boolean;
  @Input() toggleOptions: IToggleOptions;
  @Input() disabled: boolean;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {}

  onToggle(event: MatSlideToggleChange) {
    const options = {
      title: this.toggleOptions.title,
      message: this.toggleOptions.message,
      cancelText: this.toggleOptions.cancelLabel,
      confirmText: this.toggleOptions.confirmLabel,
    };

    if (event.checked) {
      options["showCheckBox"] = this.toggleOptions.showCheckBox;
    } else {
      delete options["showCheckBox"];
    }
    this.confirmDialog.open(options);

    this.confirmDialog.listenCheckboxChange().subscribe((isChecked) => {
      this.listenCheckbox.emit(isChecked);
    });

    this.confirmDialog.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        this.toggled.emit(event.checked);
      } else {
        event.source.checked = !event.source.checked;
        this.value = event.source.checked;
      }
    });
  }

  getToolTip(toggleChecked: boolean): string {
    return toggleChecked
      ? this.toggleOptions.activeLabel
      : this.toggleOptions.inactiveLabel;
  }
}
