import { TestBed } from "@angular/core/testing";
import { ErpDealersService } from "./erp-dealers.service";

describe("ErpDealersService", () => {
  let service: ErpDealersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErpDealersService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
