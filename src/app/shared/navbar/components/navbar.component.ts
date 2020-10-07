import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
})
export class NavbarComponent implements OnInit {
  @Output() logoutClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() profileClicked: EventEmitter<any> = new EventEmitter<any>();
  @Input() userName: string | null = "";
  @Input() fullName: string | null = "";
  @Input() firstName: string | null;

  constructor() {}

  ngOnInit(): void {}

  onLogout() {
    this.logoutClicked.emit();
  }

  onProfileClick() {
    this.profileClicked.emit();
  }

  greetUser(): string {
    return this.firstName ? `Welcome, ${this.firstName}` : "";
  }
}
