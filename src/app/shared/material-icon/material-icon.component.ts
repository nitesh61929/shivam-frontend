import { Component, Input, OnInit } from "@angular/core";
import { AppIcons } from "@core/enums";

@Component({
  selector: "app-material-icon",
  templateUrl: "./material-icon.component.html",
})
export class MaterialIconComponent implements OnInit {
  @Input() iconName: string;

  materialIcon: string;
  constructor() {}

  ngOnInit(): void {
    this.materialIcon = AppIcons[this.iconName];
  }
}
