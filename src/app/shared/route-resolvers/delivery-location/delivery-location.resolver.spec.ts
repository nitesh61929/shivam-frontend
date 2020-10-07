import { TestBed } from "@angular/core/testing";
import { DeliveryLocationResolver } from "./delivery-location.resolver";

describe("DeliveryLocationResolverService", () => {
  let service: DeliveryLocationResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryLocationResolver);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
