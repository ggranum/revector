import {Component, ChangeDetectionStrategy, Input} from '@angular/core'
import {Store} from '@ngrx/store'

import {AuthStateIF, SignInStateIF, UserAuthInfoIF, AuthActions} from '@revector/auth-service'

// @revisit: There seems to be a bug. Using the /auth-service/index target for import causes Injection to fail.
// import {} from "@revector/auth-service";


@Component({
  selector: 'gg-top-nav-profile-component',
  templateUrl: 'top-nav-profile.component.html',
  styleUrls: ['top-nav-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopNavProfileComponent {

  @Input() signInState: SignInStateIF  = {}
  @Input() user:UserAuthInfoIF

  logoutButtonLabel:string = "Sign Out"

  showAccountFlyout:boolean = false

  constructor( private _store: Store<AuthStateIF>, public appActions:AuthActions) {
  }

  doLogoutAction() {
    this._store.dispatch(this.appActions.requestLogout())
  }
}
