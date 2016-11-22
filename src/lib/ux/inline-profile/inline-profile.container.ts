import {NgModule} from '@angular/core'


import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'

import {MdButtonModule} from '@angular/material/button/button'
import {MdIconModule} from '@angular/material/icon/icon'
import {MdInputModule} from '@angular/material/input/input'

import {Component, ChangeDetectionStrategy, Input} from '@angular/core'

import {AuthServiceState, User, CurrentUserActions, SignInStates, SignInState} from '@revector/auth-service'
import {Store} from "@ngrx/store";
import {InlineProfileComponent} from "./inline-profile.component";
import {Observable} from "rxjs";

// @revisit: There seems to be a bug. Using the /auth-service/index target for import causes Injection to fail.
// import {} from '@revector/auth-service';


@Component({
  selector: 'rv-inline-profile-container',
  template: `<rv-inline-profile-component 
      [user]="user | async"
      [signInState]="signInState | async"></rv-inline-profile-component>`,
  styleUrls: ['../inline-login-form/inline-login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InlineProfileContainer {

  signInState: Observable<SignInState>
  user: User

  constructor(private _store: Store<AuthServiceState>) {
  }


  isSignedIn(signInState: SignInState) {
    return signInState.state == SignInStates.signedIn
  }

  doSignOut() {
    this._store.dispatch(CurrentUserActions.signOut.invoke)
  }
}


@NgModule({
  declarations: [
    InlineProfileContainer,
    InlineProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MdButtonModule,

    MdIconModule,
    MdInputModule
  ],
  exports: [
    InlineProfileContainer,
    InlineProfileComponent
  ]
})
export class InlineProfileModule {

}
