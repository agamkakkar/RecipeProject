import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertModalComponent } from "./alert/alert-modal/alert-modal.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";

@NgModule({
  declarations:[
    LoadingSpinnerComponent,
    DropdownDirective,
    AlertModalComponent
  ],
  exports: [
    LoadingSpinnerComponent,
    DropdownDirective,
    AlertModalComponent,
    CommonModule
  ]
})
export class SharedModule{

}
