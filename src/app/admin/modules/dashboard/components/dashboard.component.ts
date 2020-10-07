import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { BaseComponent } from "@core/components/base";
import DateUtilities from "@core/utilities/date-utilities";
import { DateRangeComponent } from "@shared/date-range";
import { IDateRangeObj } from "@shared/date-range/interfaces";
import { IMenuItem } from "@shared/sidebar";
import { LineChartComponent } from "@swimlane/ngx-charts";
import { Observable } from "rxjs";
import {
  IConsumersSms,
  IOrderByPaymentMethod,
  IOrdersAmount,
} from "../interfaces";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent extends BaseComponent implements OnInit {
  @ViewChild("orderAmountDateRange") orderAmountDateRange: DateRangeComponent;
  @ViewChild("ordersAmountChart") ordersAmountChart: LineChartComponent;
  @Input() ordersAmount$: Observable<IOrdersAmount[]>;
  @Input() consumersSmsList$: Observable<IConsumersSms>;
  @Input() ordersByPaymentMethods$: Observable<IOrderByPaymentMethod[]>;
  @Output()
  paramChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  orderForPaymentMethodParamChanged: EventEmitter<any> = new EventEmitter<
    any
  >();
  totalConsumers: number;
  availableSmsCredits: number;
  menuLists: IMenuItem[];
  ordersAmount: IOrdersAmount[];
  startDate: string;
  endDate: string;
  ordersAmountChartData: any[] = [
    {
      name: "Orders",
      series: [],
    },
  ];

  paymentsAmountChartData: any[] = [
    {
      name: "Khalti",
      value: "khalti",
      series: [],
    },
    {
      name: "eSewa",
      value: "esewa",
      series: [],
    },
    {
      name: "Connect IPS",
      value: "connect_ips",
      series: [],
    },
    {
      name: "Cash On Delivery",
      value: "cash_on_delivery",
      series: [],
    },
  ];
  paymentAmountChart = [];
  view = [];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = "Date";
  showYAxisLabel = true;
  yAxisLabel = "Amount";
  timeline = true;

  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"],
  };

  constructor(injector: Injector) {
    super(injector);
    this.setDefaultDates();
    this.view = [innerWidth / 1.41, 400];
  }

  ngOnInit(): void {
    this.listenOrdersAmountObservable();
    this.listenOrdersByPaymentMethodsObservable();

    this.consumersSmsList$.subscribe((d) => {
      this.totalConsumers = d.total_consumers;
      this.availableSmsCredits = d.sms_credits_available;
    });
  }

  setDefaultDates() {
    this.startDate = DateUtilities.substractMonthFromToday();
    this.endDate = DateUtilities.getday("today", "YYYY-MM-DD");
  }

  listenOrdersByPaymentMethodsObservable() {
    this.ordersByPaymentMethods$.subscribe((orderByPaymentMethod) => {
      if (Object.keys(orderByPaymentMethod).length > 0) {
        Object.entries(orderByPaymentMethod).forEach((item: any) => {
          this.paymentsAmountChartData.forEach((paymentAmountChartData) => {
            if (item[0] === paymentAmountChartData.value) {
              const paymentOrderDatas = [];
              item[1].forEach((paymentOrder) => {
                const obj = {};
                obj["name"] = DateUtilities.toEpoch(paymentOrder["date"]);
                // obj["name"] = paymentOrder["date"];
                obj["value"] = paymentOrder["total_amount"];
                paymentOrderDatas.push(obj);
              });
              paymentAmountChartData.series = paymentOrderDatas;
            }
          });
        });
        this.paymentAmountChart = [...this.paymentsAmountChartData];
      }
    });
  }

  listenOrdersAmountObservable() {
    this.ordersAmount$.subscribe((ordersAmount) => {
      this.ordersAmount = ordersAmount;
      this.buildOrderAmountDatas();
    });
  }

  buildOrderAmountDatas() {
    const orderAmountDatas = [];
    this.ordersAmount.forEach((orderAmount) => {
      const obj = {};
      obj["name"] = DateUtilities.toEpoch(orderAmount["date"]);
      // obj["name"] = orderAmount["date"];
      obj["value"] = orderAmount["total_amount"];
      orderAmountDatas.push(obj);
    });

    this.ordersAmountChartData[0].series = orderAmountDatas;
    this.ordersAmountChartData = [...this.ordersAmountChartData];
  }

  goTo(route: string) {
    this.redirectTo(route);
  }

  onDateRangeForOrderAmountSelect(dateRangeObj: IDateRangeObj) {
    const param = {
      starts_at: dateRangeObj.startDate,
      ends_at: dateRangeObj.endDate,
    };
    this.paramChanged.emit(param);
  }

  onDateRangeForOrderByPaymentMethodSelect(dateRangeObj: IDateRangeObj) {
    const param = {
      starts_at: dateRangeObj.startDate,
      ends_at: dateRangeObj.endDate,
    };
    this.orderForPaymentMethodParamChanged.emit(param);
  }

  onPaymentDueChangeForOrderAmount(event: any) {
    const param = {
      is_due: event.checked ? 1 : 0,
    };
    this.paramChanged.emit(param);
  }

  onPaymentDueChangeForOrderByPaymentMethod(event: any) {
    const param = {
      is_due: event.checked ? 1 : 0,
    };
    this.orderForPaymentMethodParamChanged.emit(param);
  }

  onResize(event) {
    this.view = [event.target.innerWidth / 1.41, 400];
  }

  dateFormatting(value) {
    return DateUtilities.epochTODate(value);
  }
}
