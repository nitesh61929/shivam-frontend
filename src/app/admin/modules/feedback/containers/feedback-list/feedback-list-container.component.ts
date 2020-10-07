import { Component, Injector, OnInit } from "@angular/core";
import { IFeedback } from "@app/admin/modules/order/interfaces/feedback";
import { BaseComponent } from "@core/components";
import { StorageKeys } from "@core/enums";
import { IData, IPagination, IParameter } from "@core/interfaces";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { LoadFeedbackAction } from "../../store";

@Component({
  selector: "app-feedback-list-container",
  templateUrl: "./feedback-list-container.component.html",
})
export class FeedbackListContainerComponent extends BaseComponent
  implements OnInit {
  feedbackList$: Observable<IFeedback[]>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;
  pagination$: Observable<IPagination>;
  modules: IData[];
  feedbackTypes: IData[];
  page = 0;
  perPage = 5;
  search = "";
  startsAt = "";
  endsAt = "";
  role = "";
  isGeneral = "";
  rating = "";
  ratings: Observable<number[]>;

  constructor(injector: Injector, private store: Store<any>) {
    super(injector);
  }

  ngOnInit(): void {
    this.feedbackList$ = this.store.select((store) => store.feedback.list);
    this.loading$ = this.store.select((store) => store.feedback.loading);
    this.error$ = this.store.select((store) => store.feedback.error);
    this.pagination$ = this.store.select((store) => store.feedback.pagination);
    this.ratings = this.globalDatas.getRatings();

    this.loadFeedback(this.getParam());
    this.fetchModuleAllocations();
    this.fetchFeedbackTypes();
  }

  fetchFeedbackTypes() {
    this.globalDatas
      .getFeedbackTypes()
      .pipe(take(1))
      .subscribe((feedbackTypes: IData[]) => {
        this.feedbackTypes = feedbackTypes;
      });
  }

  fetchModuleAllocations() {
    this.globalDatas
      .getRoleModules()
      .pipe(take(1))
      .subscribe((roleModules: IData[]) => {
        this.modules = roleModules;
      });
  }

  loadFeedback(param: IParameter) {
    this.store.dispatch(new LoadFeedbackAction(param));
  }

  onParamChange(param: IParameter) {
    this.page = param.page || param.page === 0 ? param.page : this.page;
    this.perPage = this.storage.get(StorageKeys.PER_PAGE);
    this.search =
      param.search || param.search === "" ? param.search : this.search;
    this.startsAt =
      param.starts_at || param.starts_at === null
        ? param.starts_at
        : this.startsAt;
    this.endsAt =
      param.ends_at || param.ends_at === null ? param.ends_at : this.endsAt;
    this.role = param.role || param.role === "" ? param.role : this.role;
    this.isGeneral =
      param.is_general || param.is_general === ""
        ? param.is_general
        : this.isGeneral;
    this.rating =
      param.rating || param.rating === "" ? param.rating : this.rating;

    this.loadFeedback(this.getParam(param));
  }

  getParam(parameter?: IParameter) {
    return {
      paginate: 1,
      page: this.page,
      per_page: this.storage.get(StorageKeys.PER_PAGE),
      search: this.search,
      starts_at: this.startsAt,
      ends_at: this.endsAt,
      role: this.role,
      is_general: this.isGeneral,
      rating: this.rating,
    };
  }
}
