export const COMBAT_ACTIONS = [
  'Attack',
  'Counter',
  'Trip',
  'Block',
  'Retreat',
]

export const COMBAT_CHOICES = {
  A: COMBAT_ACTIONS[0],
  C: COMBAT_ACTIONS[1],
  T: COMBAT_ACTIONS[2],
  B: COMBAT_ACTIONS[3],
  R: COMBAT_ACTIONS[4],
}

const {A, C, T, B, R} = COMBAT_CHOICES

export function calcDamage(player, enemy) { // eslint-disable-line fp/no-nil
  switch (player.action + enemy.action) {

    case A + A: {
      const playerDamage = enemy.weapon.rating - player.armor.rating
      const enemyDamage = player.weapon.rating - enemy.armor.rating
      return [playerDamage, enemyDamage]
    }

    default:
      // Return zero damage for both.
      return [0, 0]

  }
}
