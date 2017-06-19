import * as COMBAT_TYPES from '../actions/combatTypes'
import {STATUSES} from '../../../lib/constants'
import {WEAPONS} from '../../../lib/weapons'
import {ARMOR} from '../../../lib/armor'

const initialState = {
  player: {
    name: 'Oláf',
    health: 10,
    status: STATUSES.WELL,
    weapon: WEAPONS.SWORD_IRON,
    armor: ARMOR.ARMOR_LEATHER,
    action: '',
  },
  enemy: {
    name: 'Efrás',
    health: 10,
    status: STATUSES.WELL,
    weapon: WEAPONS.SWORD_EPIC,
    armor: ARMOR.ARMOR_IRON,
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

    case COMBAT_TYPES.COMBAT_ROUND:
      return {
        ...state,
        player: {
          ...state.player,
          health: state.player.health - 1,
          action: '',
        },
        enemy: {
          ...state.enemy,
          action: '',
        },
      }

    default:
      return state

  }
}
