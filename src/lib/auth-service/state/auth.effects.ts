import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {AuthServiceCIF, UserAuthInfoIF, UserAuthTokenIF} from "../service/auth.service.interface";
import {AuthStoreStateIF, AuthStateIF} from "./auth.state";
import {AuthActions} from "./auth.actions";

@Injectable()
export class AuthEffects {

  appState: AuthStateIF

  constructor(public store: Store<AuthStoreStateIF>, public authService: AuthServiceCIF, public appActions: AuthActions) {
    authService.globalEventObserver().subscribe((authState: UserAuthTokenIF)=>{
      this.globalAuthEventHandler(authState)
    })

    store.select((s: AuthStoreStateIF) => s.auth).subscribe((s: AuthStateIF) => this.appState = s, this.onError)

    store.select((s: AuthStoreStateIF) => s.auth.signInState.signingIn).subscribe((v) => this.onSigningIn(v), (e) => this.onError(e))
    store.select((s: AuthStoreStateIF) => s.auth.signInState.signingUp).subscribe((v) => this.onSigningUp(v), (e) => this.onError(e))
    store.select((s: AuthStoreStateIF) => s.auth.signInState.newAccount).subscribe((v) => this.onSignUpFulfilled(v), (e) => this.onError(e))
    store.select((s: AuthStoreStateIF) => s.auth.signInState.signingOut).subscribe((v) => this.onSigningOut(v), (e) => this.onError(e))

  }

  //noinspection JSMethodCanBeStatic
  onError(e:Error):void {
    console.error("AuthEffects", "onError", e)
  }

  onSigningIn(value: boolean) {
    if (value === true) {
      this.authService.requestSignIn(this.appState.authToken).subscribe(
        (userAuthInfo:UserAuthInfoIF) => {
          debugger
          this.store.dispatch(this.appActions.requestSignInFulfilled(userAuthInfo))
        },
        (e) => {
          this.store.dispatch(this.appActions.requestSignInFailed(e))
        }
      )
    }
  }

  onSigningUp(value: boolean) {
    if (value === true) {
      this.authService.requestSignUp(this.appState.authToken).subscribe(
        (userAuthInfo:UserAuthInfoIF) => {
          this.store.dispatch(this.appActions.requestSignUpFulfilled(userAuthInfo))
        },
        (e) => {
          this.store.dispatch(this.appActions.requestSignUpFailed(e))
        }
      )
    }
  }

  onSignUpFulfilled(value: boolean) {
    if (value === true) {
      this.authService.populateNewAccountInfo(this.appState.user).subscribe(
        () => { },
        (e) => {
          this.store.dispatch(this.appActions.requestSignUpFailed(e))
        }
      )
    }
  }

  onSigningOut(value: boolean) {
    if (value === true) {
      this.authService.logout()
      this.store.dispatch(this.appActions.requestSignOutFulfilled())
    }
  }

  private globalAuthEventHandler(authState: UserAuthTokenIF) {
    if (this.appState.signInState.unknown === true) {
      if(authState && authState.auth) {
        this.handleUserRemembered(authState);
      } else{
        this.handleAnonymousUser()
      }
    }
  }

  private handleUserRemembered(authState: UserAuthTokenIF) {
    let user: UserAuthInfoIF = <UserAuthInfoIF>authState.auth
    this.store.dispatch(this.appActions.initialize(user))
  }
  private handleAnonymousUser() {
    this.store.dispatch(this.appActions.initialize(null))
  }

}

let safe = function (fn:any):any {
  try {
    return fn()
  } catch (e) {
    return null
  }
}
