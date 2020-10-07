import {
  Component,
  EventEmitter,
  HostListener,
  Inject,
  OnInit,
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-confirm-dialog",
  templateUrl: "./confirm-dialog.component.html",
})
export class ConfirmDialogComponent implements OnInit {
  onChangeCheckbox = new EventEmitter<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      cancelText: string;
      confirmText: string;
      message: string;
      title: string;
      showCheckBox: boolean;
    },
    private mdDialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {}

  ngOnInit(): void {}

  cancel() {
    this.close(false);
  }

  close(value) {
    this.mdDialogRef.close(value);
  }
  public confirm() {
    this.close(true);
  }

  onCheckboxChange(event: any) {
    this.onChangeCheckbox.emit(event.checked);
  }

  @HostListener("keydown.esc")
  public onEsc() {
    this.close(false);
  }
}
