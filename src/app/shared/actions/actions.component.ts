import {
  Component,
  EventEmitter,
  Injector,
  Input,
  Output,
} from "@angular/core";
import { BaseComponent } from "@core/components";
import { IAction } from "./interfaces";

@Component({
  selector: "app-actions",
  templateUrl: "./actions.component.html",
})
export class ActionsComponent extends BaseComponent {
  @Output() actionClicked: EventEmitter<string> = new EventEmitter<string>();

  @Input() actions: IAction[];

  constructor(injector: Injector) {
    super(injector);
  }

  onClickAction(actionName: string) {
    this.actionClicked.emit(actionName);
  }

  /**
   * return icon name constant
   * @param action
   */
  getIconName(action: string): string {
    switch (action) {
      case "edit": {
        return "EDIT";
      }
      case "delete": {
        return "DELETE";
      }

      case "detail": {
        return "DETAIL";
      }

      default: {
        return "EDIT";
      }
    }
  }

  getClass(action: string): string {
    switch (action) {
      case "edit": {
        return "theme-icon-alternate";
      }
      case "delete": {
        return "theme-icon-error";
      }

      case "detail": {
        return "theme-icon-alternate theme-icon-primary";
      }

      default: {
        return "theme-icon-alternate";
      }
    }
  }

  getColor(action: string): string {
    switch (action) {
      case "edit": {
        return null;
      }
      case "delete": {
        return "primary";
      }

      case "detail": {
        return "primary";
      }

      default: {
        return "primary";
      }
    }
  }

  getToolTip(action: string): string {
    switch (action) {
      case "edit": {
        return "Edit this record";
      }
      case "delete": {
        return "Delete this record";
      }
      case "detail": {
        return "View detail";
      }
      default: {
        return null;
      }
    }
  }
}
