import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpModule)
  ,  canActivate: [AuthGuard],
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/sign-in/sign-in.module').then(m => m.SignInModule)
,
    canActivate: [AuthGuard],
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)
  ,  canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'signin',
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
