import * as COMBAT_TYPES from '../actions/combatTypes'
import {STATUSES} from '../../../lib/constants'
import {SWORDS} from '../../../lib/weapons'
import {ARMOR} from '../../../lib/armor'

const initialState = {
  player: {
    name: 'Oláf',
    health: 10,
    status: STATUSES.WELL,
    weapon: SWORDS.IRON,
    armor: ARMOR.LEATHER,
    action: '',
  },
  enemy: {
    name: 'Efrás',
    health: 10,
    status: STATUSES.WELL,
    weapon: SWORDS.EPIC,
    armor: ARMOR.EPIC,
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
