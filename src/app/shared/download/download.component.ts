import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IParameter } from "@core/interfaces";
import { saveAs } from "file-saver";
import { IDownloadOptions } from "./interfaces";
import { DownloadService } from "./services";

@Component({
  selector: "app-download",
  templateUrl: "./download.component.html",
})
export class DownloadComponent implements OnInit {
  @Output() download: EventEmitter<any> = new EventEmitter<any>();
  @Input() downloadOptions: IDownloadOptions;
  @Input() parameters: IParameter;

  constructor(private downloadService: DownloadService) {}

  ngOnInit(): void {}

  onDownload() {
    this.download.emit();
    this.downloadService
      .download(this.downloadOptions.resourceUrl, this.parameters)
      .subscribe(
        (d) => {
          this.downloadFile(d);
        },
        (err) => {}
      );
  }

  downloadFile(data: any) {
    const blob = new Blob([data], { type: "application/vnd.ms.excel" });
    const file = new File([blob], this.downloadOptions.fileName + ".xlsx", {
      type: "application/vnd.ms.excel",
    });
    saveAs(file);
  }
}
