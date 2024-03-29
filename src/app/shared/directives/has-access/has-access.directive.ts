import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from "@angular/core";
import { PermissionsService } from "@core/services/permissions";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Directive({
  selector: "[appHasAccess]",
})
export class HasAccessDirective implements OnInit, OnDestroy {
  @Input() appHasAccess: string;
  stop$ = new Subject();

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionsService: PermissionsService
  ) {}

  ngOnInit(): void {
    this.permissionsService
      .checkAuthorization(this.appHasAccess)
      .pipe(takeUntil(this.stop$))
      .subscribe((authorized) => {
        if (authorized) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      });
  }

  ngOnDestroy() {
    this.stop$.next();
  }
}
