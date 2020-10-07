import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { BaseComponent } from "@core/components/base";
import { IData } from "@core/interfaces";
import DateUtilities from "@core/utilities/date-utilities";
import { CommonValidators } from "@core/validators";
import { FileUploadComponent } from "@shared/file-upload";
import { IFormOptions } from "@shared/form/interfaces/form-options";
import { Observable } from "rxjs";
import { IAnnouncement } from "../../interfaces/announcement";
import { AnnouncementService } from "../../services/announcement.service";

@Component({
  selector: "app-announcement-form",
  templateUrl: "./announcement-form.component.html",
})
export class AnnouncementFormComponent extends BaseComponent
  implements OnInit, AfterViewInit {
  @ViewChild("fileUploadCmp") fileUploadCmp: FileUploadComponent;
  @Output()
  saveOrUpdateAnnouncement: EventEmitter<FormGroup> = new EventEmitter<
    FormGroup
  >();
  @Output() cancelAnnouncement: EventEmitter<any> = new EventEmitter<any>();
  @Input() announcementDetail$: Observable<IAnnouncement>;
  @Input() moduleAllocations: IData[];
  @Input() announcementTypes: IData[];

  announcementDetail: IAnnouncement;
  fileSrc: string;
  fileType: string;
  isSubmitted = false;
  startDate: string;
  endDate: string;
  today = DateUtilities.getday("today", "YYYY-MM-DD");

  constructor(
    injector: Injector,
    private announcementService: AnnouncementService,
    private cdr: ChangeDetectorRef
  ) {
    super(injector);
  }
  announcementForm: FormGroup;
  formOptions: IFormOptions;

  ngAfterViewInit() {
    // to avoid expression changed error
    this.cdr.detectChanges();
  }

  checkFileFormat() {
    if (this.fileUploadCmp && this.fileUploadCmp.format) {
      if (
        this.fileUploadCmp.format === "video" ||
        this.fileUploadCmp.format === "pdf"
      ) {
        return true;
      }
    }
    return false;
  }

  ngOnInit(): void {
    this.createAnnouncementForm();
    this.setFormOptions();
    const announcementId = this.activatedRoute.snapshot.paramMap.get("id");
    if (announcementId) {
      this.buildAnnouncementForm();
    }
  }

  private buildAnnouncementForm() {
    this.announcementDetail$.subscribe((announcementDetail: IAnnouncement) => {
      if (announcementDetail) {
        this.announcementDetail = announcementDetail;
        this.announcementForm.patchValue(announcementDetail);
        this.startDate = DateUtilities.convertDateTImeFormat(
          announcementDetail.starts_at,
          "YYYY-MM-DD"
        );
        this.endDate = DateUtilities.convertDateTImeFormat(
          announcementDetail.ends_at,
          "YYYY-MM-DD"
        );
        this.announcementForm.get("start_date").setValue(this.startDate);
        this.announcementForm.get("end_date").setValue(this.endDate);
        this.announcementForm.get("starts_at").setValue(this.startDate);
        this.announcementForm.get("ends_at").setValue(this.endDate);

        this.setFormOptions(true);
      }
    });
  }

  private setFormOptions(isEdit?: boolean) {
    if (isEdit) {
      this.formOptions = {
        headerTitle: "edit_announcement_label",
        saveBtnLabel: "update_label",
        cancelBtnLabel: "cancel_label",
        formClass: "announcement-form full",
      };
    } else {
      this.formOptions = {
        headerTitle: "add_announcement_label",
        saveBtnLabel: "save_label",
        cancelBtnLabel: "cancel_label",
        formClass: "announcement-form full",
      };
    }
  }

  private createAnnouncementForm() {
    this.announcementForm = this.formBuilder.group({
      id: [""],
      title: ["", [Validators.required, Validators.minLength(5)]],
      start_date: ["", Validators.required],
      starts_at: [""],
      end_date: ["", Validators.required],
      ends_at: [""],
      is_for_consumer: ["", Validators.required],
      type: ["", Validators.required],
      status: [0],
      resource_path: [
        "",
        Validators.compose([
          Validators.required,
          CommonValidators.checkFileType([
            "png",
            "jpg",
            "jpeg",
            "gif",
            "mp4",
            "pdf",
          ]),
          CommonValidators.checkFileSize(),
        ]),
      ],
      thumbnail: [
        "",
        [
          CommonValidators.checkFileType(["png", "jpg", "jpeg"]),
          CommonValidators.checkFileSize(),
        ],
      ],
    });
  }

  onStartDateChange(event: any) {
    const selectedDateTime = event.value;
    this.startDate = DateUtilities.convertDateTImeFormat(
      selectedDateTime,
      "YYYY-MM-DD"
    );
    this.announcementForm.get("starts_at").setValue(this.startDate);
  }

  onEndDateChange(event: any) {
    const selectedDateTime = event.value;
    this.endDate = DateUtilities.convertDateTImeFormat(
      selectedDateTime,
      "YYYY-MM-DD"
    );
    this.announcementForm.get("ends_at").setValue(this.endDate);
  }

  onSaveAnnouncementForm() {
    this.isSubmitted = true;
    this.saveOrUpdateAnnouncement.emit(this.announcementForm);
  }

  onCancelAnnouncementForm() {
    this.cancelAnnouncement.emit();
  }

  onClearResourcePath() {
    this.announcementForm.get("resource_path").reset();
  }

  onClearThumbnail() {
    this.announcementForm.get("thumbnail").reset();
  }
}
