import {ActionReducer, Action} from "@ngrx/store";
import {UserAuthInfoIF} from "../service/auth.service.interface";
import {AuthActions, RequestAuthenticationAction, AuthenticationFailedAction} from "./auth.actions";


export interface SignInStateIF {
  unknown?: boolean
  signedOut?: boolean
  signingIn?: boolean
  signedIn?: boolean
  newAccount?: boolean
  signInFailed?: boolean
  signingUp?: boolean
  signUpFailed?: boolean
  signingOut?: boolean
  errorMessage?: string
}


export interface UserProfileIF {
}

export interface UsersIF {
  [uid: string]: {
    authInfo: UserAuthInfoIF,
    profile: UserProfileIF
  }
}


export interface AuthStateIFF {
  users?: UsersIF,
  signInState?: SignInStateIF,
  user?: UserAuthInfoIF,
  authToken?: {
    email: string,
    password: string,
  }
}

export interface AuthStateIF extends AuthStateIFF{
  users: UsersIF,
  signInState: SignInStateIF,
  user: UserAuthInfoIF
}

export interface AuthStoreStateIF {
  auth: AuthStateIF
}

let InitialState: AuthStateIF = {
  users: {},
  signInState: {
    unknown: true
  },
  user: null,
}

export const AuthReducer: ActionReducer<AuthStateIF> = (state = InitialState, action: Action) => {
  let newState:AuthStateIF = null
  let actionKey:string = ActionKeysByToken[action.type]
  if (actionKey) {
    if (Reducers[actionKey]) {
      newState = Reducers[actionKey](state, action)
    } else {
      console.log(`Missing reducer function for '${actionKey}: ${action.type}'`)
    }
  }
  return newState || state
}

const Reducers:{[key:string]: (state: AuthStateIF, action: Action) => AuthStateIF} = {

  INITIALIZE: function (state: AuthStateIF, action: Action): AuthStateIF {
    let signedIn = action.payload != null
    let newState: AuthStateIFF = {
      signInState: {
        signedIn: signedIn,
        signedOut: !signedIn
      },
      user: action.payload
    }
    state = Object.assign({}, state, newState)
    if(state.user){
      state.users[state.user.uid] = {
        authInfo: state.user,
        profile: {}
      }
    }

    return state
  },
  REQUEST_SIGN_IN: function (state: AuthStateIF, action: RequestAuthenticationAction): AuthStateIF {
    state = Object.assign({}, state, {
      signInState: {signingIn: true},
      authToken: {
        email: action.payload.email,
        password: action.payload.password
      }
    })
    return state
  },
  REQUEST_SIGN_IN_FULFILLED: function (state: AuthStateIF, action: Action): AuthStateIF {
    let signedIn = action.payload != null
    let newState: AuthStateIFF = {
      signInState: {
        signedIn: signedIn,
        signedOut: !signedIn
      },
      user: action.payload,
      authToken: null
    }
    state = Object.assign({}, state, newState)
    return state
  },
  REQUEST_SIGN_IN_FAILED: function (state: AuthStateIF, action: AuthenticationFailedAction): AuthStateIF {
    state = Object.assign({}, state, {
      signInState: {
        errorMessage: action.payload,
        signInFailed: true,
        loggedIn: false
      },
      authToken: null
    })
    return state
  },
  REQUEST_SIGN_UP: function (state: AuthStateIF, action: Action): AuthStateIF {
    state = Object.assign({}, state, {
      signInState: {signingUp: true},
      authToken: {
        email: action.payload.email,
        password: action.payload.password
      }
    })
    return state
  },
  REQUEST_SIGN_UP_FULFILLED: function (state: AuthStateIF, action: Action): AuthStateIF {
    let signedIn = action.payload != null
    let newState: AuthStateIFF = {
      signInState: {
        signedIn: signedIn,
        newAccount: signedIn,
        signedOut: !signedIn
      },
      user: action.payload,
      authToken: null
    }
    state = Object.assign({}, state, newState)
    return state
  },
  REQUEST_SIGN_UP_FAILED: function (state: AuthStateIF, action: AuthenticationFailedAction): AuthStateIF {
    state = Object.assign({}, state, {
      signInState: {
        errorMessage: action.payload,
        signUpFailed: true
      },
      authToken: null
    })
    return state
  },
  REQUEST_SIGN_OUT: function (state: AuthStateIF, action: Action): AuthStateIF {
    state = Object.assign({}, state, {
      signInState: {signingOut: true},
      authToken: null
    })
    return state
  },
  REQUEST_SIGN_OUT_FULFILLED: function (state: AuthStateIF, action: Action): AuthStateIF {
    state = Object.assign({}, state, {
      signInState: {signedOut: true},
      user: null
    })
    return state
  },
  REQUEST_CREATE_ACCOUNT: function (state: AuthStateIF, action: Action): AuthStateIF {
    return state
  },
}

const ActionKeysByToken:{[key:string]:string} = (() => {
  let result:{[key:string]:string} = {}
  Object.keys(AuthActions).forEach((key:string) => {
    let y:any = AuthActions
    let x:any = y[key]
    result[x] = key
  })
  return result
})()
