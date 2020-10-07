import {
  AfterViewInit,
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSelectChange } from "@angular/material/select";
import { MatTableDataSource } from "@angular/material/table";
import { BaseComponent } from "@core/components";
import { StorageKeys } from "@core/enums";
import { IData, IPagination } from "@core/interfaces";
import { IDateRangeObj } from "@shared/date-range/interfaces";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { IFeedback } from "../../interfaces";

@Component({
  selector: "app-feedback-list",
  templateUrl: "./feedback-list.component.html",
})
export class FeedbackListComponent extends BaseComponent
  implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("selectRating") selectRating;
  @Output() paramChanged: EventEmitter<any> = new EventEmitter<any>();
  @Input() feedbackList$: Observable<IFeedback[]>;
  @Input() pagination$: Observable<IPagination>;
  @Input() modules: IData[];
  @Input() feedbackTypes: IData[];
  @Input() ratings: Observable<number[]>;
  dataSource: MatTableDataSource<IFeedback>;
  listLength: number;
  displayedColumns: string[] = [
    "name",
    "order_id",
    "role",
    "date",
    "order_area",
    "content",
  ];

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.listenObservables();
  }

  ngAfterViewInit() {
    this.trackPaginator();
  }

  trackPaginator() {
    if (this.paginator) {
      this.paginator.page
        .pipe(
          tap(() => {
            this.storage.set(StorageKeys.PER_PAGE, this.paginator.pageSize);
            const param = {
              page: this.paginator.pageIndex,
            };
            this.paramChanged.emit(param);
          })
        )
        .subscribe();
    }
  }

  listenObservables() {
    this.feedbackList$.subscribe((feedbackList) => {
      this.dataSource = new MatTableDataSource(feedbackList);
    });

    this.pagination$.subscribe((pagination) => {
      this.listLength = pagination ? pagination.total : null;
    });
  }

  onSearch(searchValue: string) {
    if (this.paginator) {
      this.paginator.pageIndex = 0;
      const param = {
        paginate: 1,
        page: this.paginator.pageIndex,
        per_page: this.paginator.pageSize,
        search: searchValue,
      };
      this.paramChanged.emit(param);
    }
  }

  onDateRangeSelect(dateRangeObj: IDateRangeObj) {
    this.paginator.pageIndex = 0;
    const param = {
      page: this.paginator.pageIndex,
      starts_at: dateRangeObj.startDate,
      ends_at: dateRangeObj.endDate,
    };
    this.paramChanged.emit(param);
  }

  onModuleChange(moduleChange: MatSelectChange) {
    this.paginator.pageIndex = 0;
    const param = {
      page: this.paginator.pageIndex,
      role: moduleChange.value,
    };
    this.paramChanged.emit(param);
  }

  onRatingChange(ratingChange: MatSelectChange) {
    this.paginator.pageIndex = 0;
    const param = {
      page: this.paginator.pageIndex,
      rating: ratingChange.value,
    };
    this.paramChanged.emit(param);
  }

  onFeedbackTypeChange(feedbackTypeChange: MatSelectChange) {
    this.paginator.pageIndex = 0;
    const param = {
      page: this.paginator.pageIndex,
      is_general: feedbackTypeChange.value,
    };
    this.paramChanged.emit(param);
  }

  getNameForFeedback(feedbackDetail: any): string {
    if (feedbackDetail) {
      if (feedbackDetail.order) {
        if (feedbackDetail.order.business_name) {
          return feedbackDetail.order.business_name;
        }
        return feedbackDetail.order.billing_name;
      } else {
        if (feedbackDetail.first_name) {
          return `${feedbackDetail.first_name} ${feedbackDetail.last_name} `;
        }
      }
    }
    return "N/A";
  }

  getRatingsArray(length: number) {
    let ratingsArray = [];
    ratingsArray = Array(length).fill(1);
    return ratingsArray;
  }
}
