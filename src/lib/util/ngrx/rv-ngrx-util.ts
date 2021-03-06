import {Action} from '@ngrx/store'
import {RvError} from '@revector/common'

export interface TypedAction<T> extends Action {
  payload: T
}

export interface TypedActionFactorySignature<T> {
  (arg?: T): TypedAction<T>
}
export interface TypedActionDefinition<S, T> {
  type: string,
  action: TypedActionFactorySignature<T>
}

export interface ActionDefinitionSignature {
  (): Action
}

export interface ActionDefinition<S> {
  type: string,
  action: ActionDefinitionSignature
}

export const actionDefinition = function<S>(type: string): ActionDefinition<S> {
  return {
    type: type,
    action() {
      return {
        type: type
      }
    }
  }
}

export const typedActionDefinition = function<S, T>(type: string): TypedActionDefinition<S, T> {
  return {
    type: type,
    action(payload?: T) {
      return {
        type: type,
        payload: payload
      }
    }
  }
}

export interface InvokableActionSet<S, I, M> {
  invoke: TypedActionDefinition<S, I>
  fulfilled: TypedActionDefinition<S, M>
  failed: TypedActionDefinition<S, RvError>
}

export const invokableActionSet = function<S, I, M>(baseTypeKey: string): InvokableActionSet<S, I, M> {
  return {
    invoke: typedActionDefinition<S, I>(baseTypeKey + ' invoke'),
    fulfilled: typedActionDefinition<S, M>(baseTypeKey + '  fulfilled'),
    failed: typedActionDefinition<S, RvError>(baseTypeKey + '  failed')
  }
}


export interface Update<T> {
  current: T,
  previous: T
}

export interface ReducerSignature<S, T> {
  (state: S, action: TypedAction<T>): S
}

export interface ReducerMapping<S, M> { toMapped: (S: any) => M, fromMapped: (S: any, M: any) => S
}

interface ReducerEntry<S, M> {
  reducer: ReducerSignature<any, any>
  prefix: string
  mappedBy?: ReducerMapping<S, M>
}

let noOpReducer = (<S, T>(state: S, action: TypedAction<T>) => state )
let errorReducer = (<S>(state: S, action: TypedAction<RvError>) => {
  console.error(action.type = ': ', action.payload)
  return state
})

export class ActionReducerSet<S> {

  private _reducers: {[key: string]: ReducerEntry<any, any>} = {}

  constructor(private _initialState?: S, private prefixScope?: string) {

  }

  combine(...reducerSets: ActionReducerSet<S>[]): void {
    let reducers = reducerSets.map(set => set._reducers)
    Object.assign(this._reducers, ...reducers)
  }

  registerMapped<M, T>(actionDef: TypedActionDefinition<M, T>,
                       mappedBy?: ReducerMapping<S, M>, reducer?: ReducerSignature<M, T>): void {
    let type = actionDef.type
    this._reducers[type] = {
      reducer: reducer || noOpReducer,
      mappedBy: mappedBy,
      prefix: actionDef.type.substr(0, actionDef.type.indexOf(']') + 1)
    }
  }

  /**
   * Register a reducer for an action definition. If a reducer is not provided this method
   * will register a no-op reducer in it's place (useful for suppressing 'missing reducer' warnings).
   */
  register<T>(actionDef: TypedActionDefinition<S, T>, reducer?: ReducerSignature<S, T>) {
    this.registerMapped(actionDef, null, reducer)
  }

  registerError(actionDef: TypedActionDefinition<S, RvError>) {
    this.register(actionDef, errorReducer)
  }

  reducer<T>(): (state: S, action: TypedAction<T>) => S {
    return <T>(state: S = this._initialState, action: TypedAction<T>): S => {
      let newState: S = null
      let reducerEntry: ReducerEntry<S, any> = this._reducers[action.type]
      if (this.isInScope(action.type)) {
        if (reducerEntry) {
          if (action.type.startsWith(reducerEntry.prefix)) {
            let tempState = state
            if (reducerEntry.mappedBy) {
              tempState = reducerEntry.mappedBy.toMapped(state)
            }
            newState = reducerEntry.reducer(tempState, action)
            if (reducerEntry.mappedBy) {
              newState = reducerEntry.mappedBy.fromMapped(state, newState)
            }
          }
        } else if (!action.type.startsWith('@ngrx')) {
          console.log(`Missing reducer function for '${action.type}`, action)
        }
      }
      return newState || state;
    }
  }

  isInScope(actionType: string): boolean {
    let inScope = true
    if (this.prefixScope) {
      inScope = actionType.startsWith(this.prefixScope)
    }
    return inScope
  }


}
