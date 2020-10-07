import { Component, Injector, Input, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormControl, Validators } from "@angular/forms";
import { MatOption } from "@angular/material/core";
import { BaseComponent } from "@core/components";
import { IPermissions } from "@core/interfaces/permission";
import { environment } from "@environments/environment";
import { RxwebValidators } from "@rxweb/reactive-form-validators";

@Component({
  selector: "app-module-configuration-form",
  templateUrl: "./module-configuration-form.component.html",
})
export class ModuleConfigurationFormComponent extends BaseComponent
  implements OnInit {
  @ViewChild("allSelected") private allSelected: MatOption;
  @Input() permissions: IPermissions;
  @Input() permissionsFromDetail: IPermissions;
  moduleWithMethodsFormArray: any;
  modulesWithMethods = [];
  moduleWithMethodsFromDetail = [];

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.setModuleWithMethods();
    this.setModuleWithMethodsFormArray();
    if (this.permissionsFromDetail) {
      this.setModuleWithMethodsFromDetail();
      this.buildModuleConfigurationForm();
    }
  }

  buildModuleConfigurationForm() {
    this.clearFormArray(this.moduleWithMethodsFormArray);
    this.moduleWithMethodsFromDetail.forEach(
      (moduleWithMethodFromDetail, index) => {
        const formGroup: any = this.createModuleWithMethodFormGroup();
        formGroup.patchValue(moduleWithMethodFromDetail);
        formGroup.get("methods").setValue(moduleWithMethodFromDetail.methods);
        this.moduleWithMethodsFormArray.push(formGroup);
      }
    );
  }

  clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }

  setModuleWithMethodsFormArray() {
    this.moduleWithMethodsFormArray = this.formBuilder.array([]);
    this.addModuleWithMethodForm();
  }

  setModuleWithMethods() {
    Object.entries(this.permissions).forEach(([key, values]) => {
      const obj = {
        module: key,
        methods: values,
      };
      this.modulesWithMethods.push(obj);
    });
  }

  setModuleWithMethodsFromDetail() {
    Object.entries(this.permissionsFromDetail).forEach(([key, values]) => {
      const obj = {
        module: key,
        methods: values,
      };
      this.moduleWithMethodsFromDetail.push(obj);
    });
  }

  addModuleWithMethodForm() {
    const moduleWithMethodForm = this.createModuleWithMethodFormGroup();
    this.moduleWithMethodsFormArray.push(moduleWithMethodForm);
  }

  createModuleWithMethodFormGroup() {
    return this.formBuilder.group({
      module: [
        "",
        Validators.compose([Validators.required, RxwebValidators.unique()]),
      ],
      methods: ["", Validators.required],
    });
  }

  getMethods(index) {
    if (index || index === 0) {
      const fg = this.moduleWithMethodsFormArray.at(index);

      const moduleWithMethod = this.modulesWithMethods.find((mo) => {
        if (mo.module === fg.value.module) {
          return mo;
        }
      });

      return moduleWithMethod ? moduleWithMethod.methods : null;
    }
  }

  onRemove(index: number) {
    this.moduleWithMethodsFormArray.removeAt(index);
  }

  onSelect(control: FormControl, methods: any) {
    const relatedPermissions = environment.relatedPermissions;

    if (control && control.value && control.value.length > 0) {
      const selectedPermissions = control.value;
      selectedPermissions.forEach((permission) => {
        Object.keys(relatedPermissions).forEach(
          (relatedPermissionKey, index) => {
            const d = relatedPermissions[relatedPermissionKey];
            this.setRelatedPermission(
              permission,
              methods,
              selectedPermissions,
              control,
              relatedPermissions[relatedPermissionKey],
              relatedPermissionKey
            );
          }
        );
      });
    }
  }

  setRelatedPermission(
    permission: any,
    methods: any,
    selectedPermissions: any,
    control: any,
    shouldContainArr: any,
    permissionAlias: any
  ) {
    shouldContainArr.forEach((viewRelatedPermission) => {
      if (permission.indexOf(viewRelatedPermission) > -1) {
        const viewItem = methods.find(
          (method) => method.indexOf(permissionAlias) > -1
        );

        if (selectedPermissions.indexOf(viewItem) < 0) {
          selectedPermissions.push(viewItem);
        }

        control.setValue(selectedPermissions);
      }
    });
  }
}
