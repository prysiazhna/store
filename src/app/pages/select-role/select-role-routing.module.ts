
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectRoleComponent } from './select-role.component';

const routes: Routes = [
  {
    path: '',
    component: SelectRoleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectRoleRoutingModule {}
