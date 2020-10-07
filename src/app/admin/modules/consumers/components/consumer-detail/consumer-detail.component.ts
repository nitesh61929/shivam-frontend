import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AppPermissions } from "@core/enums";
import { IUser } from "@core/interfaces";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";

@Component({
  selector: "app-consumer-detail",
  templateUrl: "./consumer-detail.component.html",
  styles: [],
})
export class ConsumerDetailComponent implements OnInit {
  @Output() backClick: EventEmitter<null> = new EventEmitter<null>();
  @Output() editClick: EventEmitter<number> = new EventEmitter<number>();
  @Input() consumerDetail$: Observable<IUser>;
  consumerDetail: IUser;
  hasEditAccess = AppPermissions.EDIT_CONSUMER;

  constructor() {}

  ngOnInit(): void {
    this.consumerDetail$.pipe(take(2)).subscribe((detail) => {
      this.consumerDetail = detail;
    });
    this.consumerDetail$.pipe(take(0)).subscribe((billing_details) => {
      this.consumerDetail = billing_details;
    });
  }

  onBackClick() {
    this.backClick.emit();
  }

  onEditClick() {
    this.editClick.emit(this.consumerDetail.id);
  }

  // getAddress(address: any) {
  //   return CommonUtilities.getAddress(address);
  // }

  getAddress(consumerDetail: any) {
    if (
      consumerDetail &&
      consumerDetail.details &&
      consumerDetail.details.state
    ) {
      const detail = consumerDetail.details;
      return `${detail.street}, ${detail.city}, ${detail.district}, ${detail.state}`;
    } else {
      return "N/A";
    }
  }
}
