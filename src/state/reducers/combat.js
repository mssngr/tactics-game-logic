import * as COMBAT_TYPES from '../actions/combatTypes'

const initialState = {
  inCombat: false,
  message: [],
}

export function combat(state = initialState, action) { // eslint-disable-line fp/no-nil
  switch (action.type) {

    case COMBAT_TYPES.START_COMBAT:
      return {
        ...state,
        inCombat: true,
      }

    case COMBAT_TYPES.END_COMBAT:
      return {
        ...state,
        inCombat: false,
      }

    case COMBAT_TYPES.COMBAT_MESSAGE:
      console.log(action.message)
      return {
        ...state,
        message: action.message,
      }
    default:
      return state

  }
}
