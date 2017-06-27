import * as COMBAT_TYPES from '../actions/combatTypes'
import {STATUSES} from '../../../lib/constants'
import * as WEAPONS from '../../../lib/weapons'
import * as ARMOR from '../../../lib/armor'

const initialState = {
  player: {
    name: 'Oláf',
    health: 10,
    status: STATUSES.WELL,
    weapon: WEAPONS.SWORD,
    armor: ARMOR.SPLINT,
    action: '',
  },
  enemy: {
    name: 'Efrás',
    health: 10,
    status: STATUSES.WELL,
    weapon: WEAPONS.AXE,
    armor: ARMOR.MAIL,
    action: '',
  },
}

export function characters(state = initialState, action) { // eslint-disable-line fp/no-nil
  switch (action.type) {

    case COMBAT_TYPES.PLAYER_CHOICE:
      return {
        ...state,
        player: {
          ...state.player,
          action: action.choice,
        },
      }

    case COMBAT_TYPES.ENEMY_CHOICE:
      return {
        ...state,
        enemy: {
          ...state.enemy,
          action: action.choice,
        },
      }

    case COMBAT_TYPES.CALC_COMBAT:
      return {
        ...state,
        player: {
          ...state.player,
          health: state.player.health - action.damage.player,
          action: '',
        },
        enemy: {
          ...state.enemy,
          health: state.enemy.health - action.damage.enemy,
          action: '',
        },
      }

    default:
      return state

  }
}
