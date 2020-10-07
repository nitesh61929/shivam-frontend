import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IProfile } from "@core/interfaces";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
})
export class ProfileComponent implements OnInit {
  @Output() editProfileClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() changePasswordClicked: EventEmitter<any> = new EventEmitter<any>();
  @Input() profile: IProfile;

  constructor() {}

  ngOnInit(): void {}

  onEditProfile() {
    this.editProfileClicked.emit();
  }

  onChangePassword() {
    this.changePasswordClicked.emit();
  }
}
