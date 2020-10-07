import { CollectionViewer } from "@angular/cdk/collections";
import { DataSource } from "@angular/cdk/table";
import { IPagination } from "@core/interfaces";
import { Store } from "@ngrx/store";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { IProduct } from "./interfaces";
import { LoadProductsAction } from "./store";

export class ProductDataSource implements DataSource<IProduct> {
  // add variables to hold the data and number of total records retrieved asynchronously
  // BehaviourSubject type is used for this purpose
  private paginationSubject = new BehaviorSubject<any>({});
  private productsSubject = new BehaviorSubject<IProduct[]>([]);

  // to show the total number of records
  private countSubject = new BehaviorSubject<number>(0);
  public products$;
  public pagination$;

  constructor(private store: Store<any>) {}

  loadProducts(pageIndex = 0, pageSize, filter = "") {
    const param = {
      page: pageIndex,
      pageSize: pageSize,
      search: filter,
    };
    this.products$ = this.store.select((store) => store.products.list);
    this.products$
      .pipe(catchError(() => of([])))
      .subscribe((productList: IProduct[]) => {
        this.productsSubject.next(productList);
      });
    this.pagination$ = this.store.select((store) => store.products.pagination);
    this.pagination$.subscribe((pagination: IPagination) => {
      this.paginationSubject.next(pagination);
    });

    this.store.dispatch(new LoadProductsAction(param));
  }

  connect(collectionViewer: CollectionViewer): Observable<IProduct[]> {
    return this.productsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer) {
    this.paginationSubject.complete();
    this.productsSubject.complete();
  }
}
