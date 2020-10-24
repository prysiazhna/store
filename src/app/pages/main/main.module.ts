import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';


@NgModule({
  declarations: [MainComponent],
  imports: [MainRoutingModule, SharedModule],
})
export class MainModule {}
