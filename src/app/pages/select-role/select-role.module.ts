import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import {  SelectRoleRoutingModule } from './select-role-routing.module';
import { SelectRoleComponent } from './select-role.component';


@NgModule({
  declarations: [SelectRoleComponent],
  imports: [SelectRoleRoutingModule, SharedModule],
})
export class SelectRoleModule {}
