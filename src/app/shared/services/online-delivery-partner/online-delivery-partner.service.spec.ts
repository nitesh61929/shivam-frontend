import { TestBed } from "@angular/core/testing";
import { OnlineDeliveryPartnerService } from "./online-delivery-partner.service";

describe("OnlineDeliveryPartnerService", () => {
  let service: OnlineDeliveryPartnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlineDeliveryPartnerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
