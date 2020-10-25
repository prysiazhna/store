import { SharedModule } from './../../shared/shared.module';
import { SignUpComponent } from './sign-up.component';
import { NgModule } from '@angular/core';
import { SignInRoutingModule } from './sign-up-routing.module';

@NgModule({
  declarations: [SignUpComponent],
  imports: [SignInRoutingModule, SharedModule],
})
export class SignUpModule {}
