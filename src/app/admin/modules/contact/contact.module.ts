import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { ContactComponent } from "./components/contact/contact.component";
import { ContactRoutingModule } from "./contact-routing.module";
import { ContactContainerComponent } from "./containers/contact/contact-container.component";

@NgModule({
  declarations: [ContactComponent, ContactContainerComponent],
  imports: [CommonModule, ContactRoutingModule, SharedModule],
})
export class ContactModule {}
