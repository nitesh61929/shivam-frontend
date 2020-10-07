import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { MatInput } from "@angular/material/input";
import { BaseComponent } from "@core/components";
import DateUtilities from "@core/utilities/date-utilities";
import { IDateRangeObj } from "./interfaces";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidCtrl = !!(control && control.invalid);
    const invalidParent = !!(
      control &&
      control.parent &&
      control.parent.invalid
    );

    return invalidCtrl;
  }
}

@Component({
  selector: "app-date-range",
  templateUrl: "./date-range.component.html",
})
export class DateRangeComponent extends BaseComponent implements OnInit {
  @Input() startDate: string;
  @Input() endDate: string;
  @Input() showClearButton = true;
  @ViewChild("startDateInput", {
    read: MatInput,
  })
  startDateInput: MatInput;

  @ViewChild("endDateInput", {
    read: MatInput,
  })
  endDateInput: MatInput;

  @Output() dateRangeSelected: EventEmitter<IDateRangeObj> = new EventEmitter<
    IDateRangeObj
  >();

  selectedStartDate: any;
  selectedEndDate: any;
  dateRangeForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.setDateRangeForm();
  }

  setDateRangeForm() {
    this.dateRangeForm = this.formBuilder.group({
      startDateCtrl: [this.startDate ? this.startDate : null],
      endDateCtrl: [this.endDate ? this.endDate : null],
    });

    this.dateRangeForm
      .get("startDateCtrl")
      .valueChanges.subscribe((startDate) => {
        if (startDate) {
          const formattedStartDate = DateUtilities.convertDateTImeFormat(
            startDate,
            "YYYY-MM-DD"
          );
          this.selectedStartDate = formattedStartDate;

          this.dateRangeForm
            .get("endDateCtrl")
            .setValidators(Validators.required);
        } else {
          this.dateRangeForm.get("endDateCtrl").clearValidators();
        }
      });

    this.dateRangeForm.get("endDateCtrl").valueChanges.subscribe((endDate) => {
      if (endDate) {
        const formattedEndDate = DateUtilities.convertDateTImeFormat(
          endDate,
          "YYYY-MM-DD"
        );
        this.selectedEndDate = formattedEndDate;

        this.dateRangeForm
          .get("startDateCtrl")
          .setValidators(Validators.required);
      } else {
        this.dateRangeForm.get("startDateCtrl").clearValidators();
      }
      this.dateRangeForm.get("startDateCtrl").updateValueAndValidity();
    });

    this.dateRangeForm.valueChanges.subscribe((form) => {
      if (form.startDateCtrl && form.endDateCtrl) {
        const dateRangeObj: IDateRangeObj = {
          startDate: DateUtilities.convertDateTImeFormat(
            form.startDateCtrl,
            "YYYY-MM-DD"
          ),
          endDate: DateUtilities.convertDateTImeFormat(
            form.endDateCtrl,
            "YYYY-MM-DD"
          ),
        };
        this.dateRangeSelected.emit(dateRangeObj);
      }

      if (!form.startDateCtrl && !form.endDateCtrl) {
        const dateRangeObj: IDateRangeObj = {
          startDate: null,
          endDate: null,
        };
        this.dateRangeSelected.emit(dateRangeObj);
      }
    });
  }

  clearStartDate() {
    this.dateRangeForm.reset();
    this.selectedStartDate = null;
    this.selectedEndDate = null;
  }
}
