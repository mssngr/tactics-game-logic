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

function positiveOnly(number) {
  if (number < 0) {
    return 0
  }
  return number
}

function attackVsAttack(player, enemy) {
  const playerDamage = positiveOnly(enemy.weapon.rating - player.armor.rating)
  const enemyDamage = positiveOnly(player.weapon.rating - enemy.armor.rating)
  return {
    player: playerDamage,
    enemy: enemyDamage,
  }
}

function attackVsCounter(player, enemy) {
  const playerDamage = positiveOnly(enemy.weapon.rating - player.armor.rating)
  return {
    player: playerDamage,
    enemy: 0,
  }
}

function attackVsTrip(player, enemy) {
  const enemyDamage = positiveOnly(player.weapon.rating - enemy.armor.rating)
  return {
    player: 0,
    enemy: enemyDamage,
  }
}

function attackVsBlock(player, enemy) {
  const enemyDamage = positiveOnly(player.weapon.rating - enemy.armor.rating - enemy.weapon.rating)
  return {
    player: 0,
    enemy: enemyDamage,
  }
}

function attackVsRetreat(player, enemy) {
  const enemyDamage = positiveOnly(player.weapon.rating - enemy.armor.rating)
  return {
    player: 0,
    enemy: enemyDamage,
  }
}

export function calcDamage(player, enemy) { // eslint-disable-line fp/no-nil
  switch (player.action + enemy.action) {

    case A + A: {
      return attackVsAttack(player, enemy)
    }

    case A + C: {
      return attackVsCounter(player, enemy)
    }

    case A + T: {
      return attackVsTrip(player, enemy)
    }

    case A + B: {
      return attackVsBlock(player, enemy)
    }

    case A + R: {
      return attackVsRetreat(player, enemy)
    }

    default:
      // Return zero damage for both.
      return {
        player: 0,
        enemy: 0,
      }

  }
}
