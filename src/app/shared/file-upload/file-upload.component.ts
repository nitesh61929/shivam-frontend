import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { DatasService } from "@core/services";

@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true,
    },
  ],
})
export class FileUploadComponent implements ControlValueAccessor, OnChanges {
  @Output() clearFile: EventEmitter<null> = new EventEmitter<null>();
  @Input() progress;
  @Input() fileSrc: string;
  @Input() fileType: string;
  @Input() btnLabel: string;
  @Input() info: string;
  @Input() enableClear = false;
  onChange: Function;
  onTouched: Function;
  public file: File | null = null;
  format: string; // image or video or pdf

  @HostListener("change", ["$event.target.files"]) emitFiles(event: FileList) {
    const file = event && event.item(0);
    this.file = file;
    this.fileSrc = null;
    this.setFileSrc();
    this.onChange(this.file);
  }

  constructor(
    private host: ElementRef<HTMLInputElement>,
    private datasService: DatasService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.fileType && changes.fileType.currentValue) {
      this.format = this.datasService.checkFileFormat(
        changes.fileType.currentValue
      );
    }
  }

  onClear() {
    this.host.nativeElement.value = "";
    this.file = null;
    this.fileSrc = null;
    this.format = null;
    this.clearFile.emit();
  }

  setFileSrc() {
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    if (this.file.type.indexOf("image") > -1) {
      this.format = "image";
      this.trackReaderOnLoad(reader);
    } else if (this.file.type.indexOf("video") > -1) {
      this.format = "video";
      this.trackReaderOnLoad(reader);
    } else if (this.file.type.indexOf("pdf") > -1) {
      this.format = "pdf";
    }
  }

  trackReaderOnLoad(reader: FileReader) {
    reader.onload = () => {
      this.fileSrc = reader.result as string;
    };
  }

  writeValue(value: null) {
    // clear file input
    this.host.nativeElement.value = "";
    this.file = null;
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouched = fn;
  }
}
