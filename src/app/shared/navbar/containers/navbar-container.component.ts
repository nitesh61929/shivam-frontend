import { Component, Injector, OnInit } from "@angular/core";
import { BaseComponent } from "@core/components/base/base.component";
import { AppRoutes } from "@core/enums";
import { IUser } from "@core/interfaces";
import { IProfile } from "@core/interfaces/profile";
import { LogOut } from "@core/store";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-navbar-container",
  templateUrl: "./navbar-container.component.html",
})
export class NavbarContainerComponent extends BaseComponent implements OnInit {
  userName: string | IUser;
  fullName: string;
  profile$: Observable<IProfile>;
  profileDetails: any;

  constructor(injector: Injector, private store: Store<any>) {
    super(injector);
  }

  ngOnInit(): void {
    this.listenObservables();
    this.userName = this.getUserProfileFromStorage("username");
    this.profileDetails = this.getUserProfileFromStorage("details");
    if (this.profileDetails) {
      this.fullName = `${this.profileDetails.first_name} ${this.profileDetails.last_name}`;
    }
  }

  listenObservables() {
    this.profile$ = this.store.select((store) => store.core.auth.profile);
    this.profile$.subscribe((profile) => {
      if (profile) {
        this.fullName = `${profile.details.first_name} ${profile.details.last_name}`;
      }
    });
  }

  onLogoutClicked(): void {
    const options = {
      title: "Logout",
      message: "Are you sure you want to logout?",
      cancelText: "Cancel",
      confirmText: "Confirm",
    };
    this.confirmDialog.open(options);

    this.confirmDialog.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        this.store.dispatch(new LogOut());
      }
    });
  }

  onProfileClicked(): void {
    this.redirectTo(AppRoutes.PROFILE_PAGE);
  }
}
