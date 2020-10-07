import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BaseComponent } from "@core/components";
import { AppRoutes } from "@core/enums";
import { IData } from "@core/interfaces";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { AnnouncementFormComponent } from "../../components";
import { IAnnouncement } from "../../interfaces/announcement";
import {
  AddUpdateAnnouncementAction,
  AnnouncementActionTypes,
  GetAnnouncementAction,
  ToggleAnnouncementAction,
} from "../../store/actions";

@Component({
  selector: "app-announcement-form-container",
  templateUrl: "./announcement-form-container.component.html",
})
export class AnnouncementFormContainerComponent extends BaseComponent
  implements OnInit {
  @ViewChild("announcementForm") announcementFormCmp: AnnouncementFormComponent;

  error$: Observable<any>;
  announcementDetail$: Observable<IAnnouncement>;
  loading$: Observable<boolean>;
  moduleAllocations: IData[];
  announcementTypes: IData[];
  notifyUsers: boolean;

  constructor(
    injector: Injector,
    private store: Store<any>,
    updateAnnouncementSuccess$: Actions
  ) {
    super(injector);
    updateAnnouncementSuccess$
      .pipe(
        ofType(AnnouncementActionTypes.ADD_UPDATE_ANNOUNCEMENT_SUCCESS),
        take(1)
      )
      .subscribe((announcement: any) => {
        if (announcement.payload.id) {
          const statusObj = {
            status: announcement.payload.status,
            notify: this.notifyUsers,
          };
          this.store.dispatch(
            new ToggleAnnouncementAction(announcement.payload.id, statusObj)
          );
        }
      });
  }

  ngOnInit(): void {
    this.announcementDetail$ = this.store.select(
      (store) => store.announcement.detail
    );
    this.error$ = this.store.select((store) => store.announcement.error);
    this.loading$ = this.store.select((store) => store.announcement.loading);
    this.fetchAnnouncementId();
    this.fetchModuleAllocations();
    this.fetchAnnouncementTypes();
    this.listenError();
  }

  fetchAnnouncementId() {
    const announcementId = this.activatedRoute.snapshot.paramMap.get("id");
    if (announcementId) {
      this.store.dispatch(
        new GetAnnouncementAction(parseInt(announcementId, 10))
      );
    }
  }

  listenError() {
    this.error$.subscribe((err) => {
      if (err && this.announcementFormCmp) {
        this.errorMessageService.handleServerSideError(
          this.announcementFormCmp.announcementForm,
          err
        );
      }
    });
  }

  fetchModuleAllocations() {
    this.globalDatas
      .getModuleAllocations()
      .pipe(take(1))
      .subscribe((moduleAllcoations: IData[]) => {
        this.moduleAllocations = moduleAllcoations;
      });
  }

  fetchAnnouncementTypes() {
    this.globalDatas
      .getAnnouncementTypes()
      .pipe(take(1))
      .subscribe((announcementTypes: IData[]) => {
        this.announcementTypes = announcementTypes;
      });
  }

  onsaveOrUpdateAnnouncement(announcmentForm: FormGroup) {
    if (announcmentForm.valid) {
      if (announcmentForm.value.id && announcmentForm.value.status) {
        const options = {
          title: "Notify Users",
          message: "Do you allow to notify users about this update?",
          cancelText: "No",
          confirmText: "Yes",
        };
        this.confirmDialog.open(options);

        this.confirmDialog.confirmed().subscribe((confirmed) => {
          if (confirmed) {
            this.notifyUsers = true;
          } else {
            this.notifyUsers = false;
          }
          this.store.dispatch(
            new AddUpdateAnnouncementAction(announcmentForm.value)
          );
        });
      } else {
        this.store.dispatch(
          new AddUpdateAnnouncementAction(announcmentForm.value)
        );
      }
    }
  }

  onCancelAnnouncement() {
    this.redirectTo(AppRoutes.ANNOUNCEMENT_PAGE);
  }
}
