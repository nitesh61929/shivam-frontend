import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { LoaderService } from "@core/services/loader/loader.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
})
export class LoaderComponent implements OnInit, AfterViewInit, OnDestroy {
  loadingSubscription: Subscription;
  constructor(
    private loaderService: LoaderService,
    private elmRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.elmRef.nativeElement.style.display = "none";
    this.loadingSubscription = this.loaderService.loading$
      // .pipe()
      .subscribe((status: boolean) => {
        this.elmRef.nativeElement.style.display = status ? "block" : "none";
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
