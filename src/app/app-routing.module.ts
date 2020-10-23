import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  // {
  //   path: 'signup',
  //   loadChildren: './content/sign-up/sign-up.module#SignUpModule',
  //   // canActivate: [AuthGuard],
  // },
  {
    path: 'signin',
    loadChildren: () => import('./pages/sign-in/sign-in.module').then(m => m.SignInModule)

    // canActivate: [AuthGuard],
  },
  // {
  //   path: 'main',
  //   loadChildren: './content/main/main.module#BackofficeModule',
  //   // canActivate: [AuthGuard],
  // },
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
