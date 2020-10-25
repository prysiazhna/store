import { SharedModule } from './../../shared/shared.module';
import { SignInComponent } from './sign-in.component';
import { NgModule } from '@angular/core';

import { SignInRoutingModule } from './sign-in-routing.module';

@NgModule({
  declarations: [SignInComponent],
  imports: [SignInRoutingModule, SharedModule],
})
export class SignInModule {}
