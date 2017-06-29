import * as COMBAT_TYPES from '../actions/combatTypes'
import {STATUSES} from 'lib/constants'
import * as WEAPONS from 'lib/weapons'
import * as ARMOR from 'lib/armor'

const initialState = {
  player: {
    name: 'Efrás',
    stamina: 10,
    status: STATUSES.WELL,
    weapon: WEAPONS.GER,
    proficiency: {
      'Sword': 3,
      'Axe': 1,
      'Spear': 2,
      'Blunt': 1,
    },
    armor: ARMOR.SPLINT,
    action: '',
  },
  enemy: {
    name: 'Maximus',
    stamina: 12,
    status: STATUSES.WELL,
    weapon: WEAPONS.AXE,
    proficiency: {
      'Sword': 1,
      'Axe': 2,
      'Spear': 1,
      'Blunt': 2,
    },
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
          stamina: state.player.stamina - action.damage.player,
          action: '',
        },
        enemy: {
          ...state.enemy,
          stamina: state.enemy.stamina - action.damage.enemy,
          action: '',
        },
      }

    default:
      return state

  }
}
