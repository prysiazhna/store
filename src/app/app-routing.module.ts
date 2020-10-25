import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'select-role',
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/sign-up/sign-up.module').then(m => m.SignUpModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('./pages/sign-in/sign-in.module').then(m => m.SignInModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./pages/main/main.module').then(m => m.MainModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-panel',
    loadChildren: () =>
      import('./pages/admin-panel/admin-panel.module').then(
        m => m.AdminPanelModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'select-role',
    loadChildren: () =>
      import('./pages/select-role/select-role.module').then(
        m => m.SelectRoleModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'signin',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
