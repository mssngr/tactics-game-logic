import * as COMBAT_TYPES from '../actions/combatTypes'
import {CONDITION, STATUS} from 'constants/combat'
import * as WEAPON from 'constants/weapons'
import * as ARMOR from 'constants/armor'

const initialState = {
  player: {
    name: 'Efrás',
    stamina: 10,
    condition: CONDITION.WELL,
    status: STATUS.READY,
    weapon: WEAPON.SPATHA,
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
    condition: CONDITION.WELL,
    status: STATUS.READY,
    weapon: WEAPON.AXE,
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

    case COMBAT_TYPES.CALC_COMBAT: {
      const playerDamage = action.result.player.damage
      const enemyDamage = action.result.enemy.damage
      const playerStatusChange = action.result.player.status
      const enemyStatusChange = action.result.enemy.status
      return {
        ...state,
        player: {
          ...state.player,
          stamina: state.player.stamina - playerDamage,
          status: playerStatusChange ? playerStatusChange : state.player.status,
          action: '',
        },
        enemy: {
          ...state.enemy,
          stamina: state.enemy.stamina - enemyDamage,
          status: enemyStatusChange ? enemyStatusChange : state.enemy.status,
          action: '',
        },
      }
    }

    default:
      return state

  }
}
