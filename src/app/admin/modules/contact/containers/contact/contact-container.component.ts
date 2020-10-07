import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BaseComponent } from "@core/components";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { IPages } from "@shared/interfaces";
import {
  LoadPagesAction,
  PagesActionTypes,
  UpdatePagesAction,
} from "@shared/store";
import { Observable } from "rxjs";
import { ContactComponent } from "../../components";

@Component({
  selector: "app-contact-container",
  templateUrl: "./contact-container.component.html",
})
export class ContactContainerComponent extends BaseComponent implements OnInit {
  @ViewChild("contactCmp") contactCmp: ContactComponent;
  error$: Observable<Error>;
  loading$: Observable<boolean>;
  pages$: Observable<IPages[]>;

  constructor(
    injector: Injector,
    private store: Store<any>,
    updatePagesSuccess$: Actions
  ) {
    super(injector);
    updatePagesSuccess$
      .pipe(ofType(PagesActionTypes.UPDATE_PAGES_SUCCESS))
      .subscribe(() => {
        this.loadPagesList();
      });
  }

  ngOnInit(): void {
    this.loadPagesList();
    this.listenObservables();
  }

  loadPagesList() {
    const param = {
      paginate: 0,
    };
    this.store.dispatch(new LoadPagesAction(param));
  }

  listenObservables() {
    this.error$ = this.store.select((store) => store.shared.pages.error);
    this.loading$ = this.store.select((store) => store.shared.pages.loading);

    this.pages$ = this.store.select((store) => store.shared.pages.list);

    this.error$.subscribe((err) => {
      if (err && this.contactCmp) {
        this.errorMessageService.handleServerSideError(
          this.contactCmp.contactForm,
          err
        );
      }
    });
  }

  onSaveOrUpdateContact(contactForm: FormGroup) {
    if (contactForm.valid) {
      this.store.dispatch(new UpdatePagesAction(contactForm.value));
    }
  }
}
