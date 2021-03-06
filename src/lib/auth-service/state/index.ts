/**
 * TypedAction import is actually required to avoid "TS4023: Exported variable .. cannot be named" compile error.
 */
//noinspection ES6UnusedImports


import {AuthServiceState, SignInStates} from '../interfaces'
import {userReducers} from './user/user.state'
//noinspection TypeScriptPreferShortImport
import {currentUserReducers} from './current-user/current-user.state'
//noinspection TypeScriptPreferShortImport
import {permissionReducers} from './permission/permission.state'
import {roleReducers} from './role/role.state'

import {ActionReducerSet, TypedAction} from "@revector/util-ngrx";


export * from './current-user/current-user.state'
export * from './current-user/current-user.effects'
export * from './current-user/current-user.actions'

export * from './role/role.state'
export * from './role/role.actions'
export * from './role/role.effects'

export * from './permission/permission.state'
export * from './permission/permission.actions'
export * from './permission/permission.effects'

export * from './user/user.state'
export * from './user/user.actions'
export * from './user/user.effects'


const initialState: AuthServiceState = {
  transient: {
    signInState: {state: SignInStates.unknown}
  },
  users: {},
  roles: {},
  permissions: {},
  role_permissions: {},
  user_permissions: {},
  user_roles: {},
}

export const authReducerSet: ActionReducerSet<AuthServiceState> =
  new ActionReducerSet<AuthServiceState>(initialState, "[Auth.");
authReducerSet.combine(currentUserReducers, roleReducers, permissionReducers, userReducers)

export const AuthReducers = authReducerSet.reducer()
