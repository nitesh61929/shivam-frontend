import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ESnackbarColor } from "./enums/snackbar-color";

@Injectable({
  providedIn: "root",
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  open(message: string, type: string) {
    const action = "clear";
    const className = ESnackbarColor[type];
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: "bottom",
      // horizontalPosition: "end",
      panelClass: [className],
    });
  }
}
