import { Component, Injector, OnInit } from "@angular/core";
import { BaseComponent } from "@core/components/base";

@Component({
  selector: "app-taxation-container",
  templateUrl: "./taxation-container.component.html",
})
export class TaxationContainerComponent extends BaseComponent
  implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {}
}
