import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CustomRouterSerializer, reducers } from './store/reducers';
import { effects } from './store/effects';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthGuard } from './shared/services/auth.guard';
import { ValidatorsService } from './shared/services/validators.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
     StoreModule.forRoot(reducers),
    SharedModule.forRoot(),  StoreDevtoolsModule.instrument({
      maxAge: 25, logOnly: environment.production
    }),
    AngularFireModule.initializeApp(environment.firebase),
 
    EffectsModule.forRoot(effects),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    SharedModule.forRoot(),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomRouterSerializer,
    }),
    AngularFireAuthModule,
  ],
  providers: [   AuthGuard,
    ValidatorsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
