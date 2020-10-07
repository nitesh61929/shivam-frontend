import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { DocumentsComponent } from "./components/documents/documents.component";
import { DocumentsContainerComponent } from "./containers/documents/documents-container.component";
import { DocumentsRoutingModule } from "./documents-routing.module";

@NgModule({
  declarations: [DocumentsComponent, DocumentsContainerComponent],
  imports: [CommonModule, DocumentsRoutingModule, SharedModule],
})
export class DocumentsModule {}
