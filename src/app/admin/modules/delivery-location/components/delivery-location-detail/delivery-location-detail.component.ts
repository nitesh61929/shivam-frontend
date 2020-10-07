import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AppPermissions } from "@core/enums";
import { IDeliveryLocation } from "@shared/interfaces";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";

@Component({
  selector: "app-delivery-location-detail",
  templateUrl: "./delivery-location-detail.component.html",
})
export class DeliveryLocationDetailComponent implements OnInit {
  @Output() editDeliveryLocation: EventEmitter<number> = new EventEmitter<
    number
  >();
  @Output() backClick: EventEmitter<number> = new EventEmitter<number>();
  @Input() deliveryLocationDetail$: Observable<IDeliveryLocation>;

  deliveryLocationDetail: IDeliveryLocation;
  hasEditAccess = AppPermissions.EDIT_DELIVERY_LOCATION;

  constructor() {}

  ngOnInit(): void {
    this.deliveryLocationDetail$.pipe(take(2)).subscribe((detail) => {
      this.deliveryLocationDetail = detail;
    });
  }

  onEditDeliveryLocation(deliveryLocationId: number) {
    this.editDeliveryLocation.emit(deliveryLocationId);
  }

  onBackClick() {
    this.backClick.emit();
  }
}
