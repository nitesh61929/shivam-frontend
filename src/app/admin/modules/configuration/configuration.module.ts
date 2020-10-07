import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { ConfigurationFormComponent } from "./components/configuration-form/configuration-form.component";
import { ConfigurationsComponent } from "./components/configurations/configurations.component";
import { ConfigurationRoutingModule } from "./configuration-routing.module";
import { ConfigurationFormContainerComponent } from "./containers/configuration-form/configuration-form-container.component";
import { ConfigurationsContainerComponent } from "./containers/configurations/configurations-container.component";

@NgModule({
  declarations: [
    ConfigurationsComponent,
    ConfigurationFormComponent,
    ConfigurationsContainerComponent,
    ConfigurationFormContainerComponent,
  ],
  imports: [CommonModule, ConfigurationRoutingModule, SharedModule],
})
export class ConfigurationModule {}
