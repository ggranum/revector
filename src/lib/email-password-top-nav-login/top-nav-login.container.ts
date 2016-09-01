import {Component, ChangeDetectionStrategy} from '@angular/core'
import {Observable} from 'rxjs'
import {Store} from '@ngrx/store'
import {SignInStateIF, AuthStoreStateIF} from "@revector/auth-service/state/auth.state";
import {UserAuthInfoIF} from "@revector/auth-service/service/auth.service.interface";


@Component({
  selector: 'gg-top-nav-login',
  template: `
<gg-top-nav-login-component [signInState]="signInState$ | async" [errorMessage]="errorMessage | async"></gg-top-nav-login-component>
<gg-top-nav-profile-component [signInState]="signInState$ | async" [user]="user$ | async"></gg-top-nav-profile-component>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopNavLoginContainer {

  signInState$: Observable<SignInStateIF>
  user$: Observable<UserAuthInfoIF>
  errorMessage:Observable<string>

  constructor(private _store: Store<AuthStoreStateIF>) {
    this.signInState$ = _store.select((s:AuthStoreStateIF) => safe(() => s.auth.signInState) )
    this.user$ = _store.select((s:AuthStoreStateIF) => safe(() => s.auth.user) )
  }
}


let safe = function(fn:()=>any){
  try {
    return fn()
  } catch (e) {
    return null
  }
}
