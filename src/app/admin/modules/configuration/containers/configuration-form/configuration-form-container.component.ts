import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BaseComponent } from "@core/components";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { IConfiguration } from "@shared/interfaces";
import {
  ConfigurationActionTypes,
  LoadConfigurationsAction,
  UpdateConfigurationAction,
} from "@shared/store";
import { Observable } from "rxjs";
import { ConfigurationFormComponent } from "../../components";

@Component({
  selector: "app-configuration-form-container",
  templateUrl: "./configuration-form-container.component.html",
})
export class ConfigurationFormContainerComponent extends BaseComponent
  implements OnInit {
  @ViewChild("configurationFormCmp")
  configurationFormCmp: ConfigurationFormComponent;
  configurations: IConfiguration[];
  error$: Observable<Error>;
  loading$: Observable<boolean>;
  configurations$: Observable<IConfiguration[]>;

  constructor(
    private store: Store<any>,
    injector: Injector,
    updateConfigurationSuccess$: Actions
  ) {
    super(injector);
    updateConfigurationSuccess$
      .pipe(ofType(ConfigurationActionTypes.UPDATE_CONFIGURATION_SUCCESS))
      .subscribe(() => {
        this.loadConfigurationList();
      });
  }

  loadConfigurationList() {
    const param = {
      paginate: 0,
    };
    this.store.dispatch(new LoadConfigurationsAction(param));
  }

  ngOnInit(): void {
    this.listenObservables();
    this.loadConfigurationList();
    // this.trackRoute();
  }

  listenObservables() {
    this.error$ = this.store.select(
      (store) => store.shared.configuration.error
    );
    this.loading$ = this.store.select(
      (store) => store.shared.configuration.loading
    );

    this.configurations$ = this.store.select(
      (store) => store.shared.configuration.list
    );

    this.error$.subscribe((err) => {
      if (err && this.configurationFormCmp) {
        this.errorMessageService.handleServerSideError(
          this.configurationFormCmp.configurationForm,
          err
        );
      }
    });
  }

  trackRoute() {
    this.activatedRoute.data.subscribe((data) => {
      this.configurations = data.configurations;
    });
  }

  onSaveOrUpdateConfiguration(configurationForm: FormGroup) {
    if (configurationForm.valid) {
      this.store.dispatch(
        new UpdateConfigurationAction(configurationForm.value)
      );
    }
  }
}
