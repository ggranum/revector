import {Observable} from "rxjs";

export interface EmailPasswordCredentials {
  email: string,
  password: string
}

export interface UserAuthInfoIF {
  displayName: string
  email: string
  emailVerified: boolean
  isAnonymous: boolean
  photoURL: string
  uid: string
}

export interface UserAuthTokenIF {
  uid: string;
  auth: UserAuthInfoIF
  expires?: number;
  anonymous?: boolean;
}

export abstract class AuthServiceCIF {
  globalEventObserver: () => Observable<UserAuthTokenIF>
  requestSignIn: (action: EmailPasswordCredentials) => Observable<UserAuthInfoIF>
  requestSignUp: (action: EmailPasswordCredentials) => Observable<UserAuthInfoIF>;
  populateNewAccountInfo: (user: UserAuthInfoIF) => Observable<any>;
  logout: () => void;
}
