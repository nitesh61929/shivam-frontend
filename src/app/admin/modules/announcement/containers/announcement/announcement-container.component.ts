import { Component, Injector, OnInit } from "@angular/core";
import { BaseComponent } from "@core/components/base";

@Component({
  selector: "app-announcement-container",
  templateUrl: "./announcement-container.component.html",
})
export class AnnouncementContainerComponent extends BaseComponent
  implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {}
}
