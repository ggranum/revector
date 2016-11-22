import {Component, ChangeDetectionStrategy, Input, ViewEncapsulation} from "@angular/core";
import {SignInState, SignInStates, User} from "@revector/auth-service";

// @revisit: There seems to be a bug. Using the /auth-service/index target for import causes Injection to fail.
// import {} from '@revector/auth-service';


@Component({
  selector: 'rv-inline-profile-component',
  templateUrl: 'inline-profile.component.html',
  styleUrls: ['./inline-profile.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class InlineProfileComponent {

  @Input() signInState: SignInState = {
    state: SignInStates.unknown
  }
  @Input() user: User



  logoutButtonLabel: string = "Sign Out"
  showAccountFlyout: boolean = false

  constructor() {

  }

  isSignedIn(signInState: SignInState) {
    return signInState.state == SignInStates.signedIn
  }

  signOut() {

  }

  dismiss($event){
    this.showAccountFlyout = false
  }
}
