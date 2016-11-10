import {NgModule, ApplicationRef} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DemoApp, Home} from './demo-app/demo-app';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '@angular/material';
import {DEMO_APP_ROUTES} from './demo-app/routes';

import {ButtonDemo} from './button/button-demo';
// import {SignInPanelModule} from '@revector/sign-in-panel';
import {ButtonDemo2} from './button2/button-demo2';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(DEMO_APP_ROUTES),
    MaterialModule.forRoot(),
    // SignInPanelModule
  ],
  declarations: [
    ButtonDemo,
    ButtonDemo2,
    DemoApp,
    Home,
  ],
  entryComponents: [
    DemoApp,
  ],
})
export class DemoAppModule {
  constructor(private _appRef: ApplicationRef) { }

  ngDoBootstrap() {
    this._appRef.bootstrap(DemoApp);
  }
}
