import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatCheckboxChange } from "@angular/material/checkbox";

@Component({
  selector: "app-select-check-all",
  templateUrl: "./select-check-all.component.html",
})
export class SelectCheckAllComponent implements OnInit {
  @Output() toggled: EventEmitter<null> = new EventEmitter<null>();
  @Input() model: FormControl;
  @Input() values = [];
  @Input() text = "Select All";

  constructor() {}

  ngOnInit(): void {}

  isChecked(): boolean {
    return (
      this.model.value &&
      this.values &&
      this.values.length &&
      this.model.value.length === this.values.length
    );
  }

  isIndeterminate(): boolean {
    return (
      this.model.value &&
      this.values &&
      this.values.length &&
      this.model.value.length &&
      this.model.value.length < this.values.length
    );
  }

  toggleSelection(change: MatCheckboxChange): void {
    if (change.checked) {
      this.model.setValue(this.values);
    } else {
      this.model.setValue([]);
    }
    this.toggled.emit();
  }
}
