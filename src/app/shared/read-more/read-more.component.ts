import { Component, ElementRef, Input, OnChanges } from "@angular/core";

@Component({
  selector: "app-read-more",
  templateUrl: "./read-more.component.html",
})
export class ReadMoreComponent implements OnChanges {
  @Input() text: string;
  @Input() maxLength = 100;
  currentText: string;
  hideToggle = false;

  public isCollapsed = true;

  constructor(private elementRef: ElementRef) {}

  toggleView() {
    this.isCollapsed = !this.isCollapsed;
    this.determineView();
  }

  determineView() {
    if (!this.text || this.text.length <= this.maxLength) {
      this.currentText = this.text;
      this.isCollapsed = false;
      this.hideToggle = true;
      return;
    }
    this.hideToggle = false;
    if (this.isCollapsed === true) {
      this.currentText = this.text.substring(0, this.maxLength) + "...";
    } else if (this.isCollapsed === false) {
      this.currentText = this.text;
    }
  }

  ngOnChanges() {
    this.determineView();
  }

  getLabel() {
    if (this.text && this.text.length) {
      const textLength = this.text.length;
      if (textLength < this.maxLength) {
        return "";
      } else {
        const moreOrLessString = this.isCollapsed ? "more" : "less";
        return `Read ${moreOrLessString}`;
      }
    }
  }
}
