import {Component} from '@angular/core';
import {User, SignInState, SignInStates} from "@revector/auth-service";


@Component({
  selector: 'inline-profile-demo',
  templateUrl: 'inline-profile-demo.html',
  styleUrls: ['inline-profile-demo.scss'],
})
export class InlineProfileDemo {
  user:User = {
    createdMils: Date.now(),
    disabled: false,
    displayName: "Joe User",
    email: "joe.user@example.com",
    uid: "101"
  }
  signInState:SignInState = {
    state: SignInStates.signedIn
  }
}
