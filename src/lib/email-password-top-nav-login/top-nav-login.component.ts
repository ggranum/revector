import {Component, ChangeDetectionStrategy, Input} from '@angular/core'
import {Store} from '@ngrx/store'
import {AuthActions, AuthStoreStateIF, SignInStateIF} from "@revector/auth-service";


@Component({
  selector: 'gg-top-nav-login-component',
  templateUrl: 'top-nav-login.component.html',
  styleUrls: ['top-nav-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopNavLoginComponent {

  @Input() signInState: SignInStateIF  = {}
  @Input() errorMessage:string

  username:string
  password:string

  usernameFieldLabel:string = "email"
  passwordFieldLabel:string = "password"
  loginButtonLabel:string = "Sign In"
  signupButtonLabel:string = "Sign Up"

  constructor( private _store: Store<AuthStoreStateIF>, public appActions:AuthActions) {
  }

  doLoginAction(event:Event) {
    event.preventDefault()
    event.stopPropagation()
    this._store.dispatch(this.appActions.requestLogin(this.username, this.password, true))
  }

  doSignupAction() {
    this._store.dispatch(this.appActions.requestSignUp(this.username, this.password, true))
  }

  onSubmit(event:Event) {
    event.preventDefault()
    event.stopPropagation()
  }

}
