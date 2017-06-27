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

function playerTakesDmg(player, enemy) {
  const playerDamage = positiveOnly(enemy.weapon.rating - player.armor.rating)
  return {
    player: playerDamage,
    enemy: 0,
  }
}

function enemyTakesDmg(player, enemy) {
  const enemyDamage = positiveOnly(player.weapon.rating - enemy.armor.rating)
  return {
    player: 0,
    enemy: enemyDamage,
  }
}

function bothTakeDmg(player, enemy) {
  const playerDamage = positiveOnly(enemy.weapon.rating - player.armor.rating)
  const enemyDamage = positiveOnly(player.weapon.rating - enemy.armor.rating)
  return {
    player: playerDamage,
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

function blockVsAttack(player, enemy) {
  const playerDamage = positiveOnly(enemy.weapon.rating - player.armor.rating - player.weapon.rating) // eslint-disable-line max-len
  return {
    player: playerDamage,
    enemy: 0,
  }
}

function playerAttacks(player, enemy) { // eslint-disable-line fp/no-nil
  switch (enemy.action) {

    case A: {
      return bothTakeDmg(player, enemy)
    }

    case C: {
      return playerTakesDmg(player, enemy)
    }

    case B: {
      return attackVsBlock(player, enemy)
    }

    case T:
    case R: {
      return enemyTakesDmg(player, enemy)
    }

    default:
      // Return zero damage for both.
      return {
        player: 0,
        enemy: 0,
      }

  }
}

function enemyAttacks(player, enemy) { // eslint-disable-line fp/no-nil
  switch (player.action) {

    case A: {
      return bothTakeDmg(player, enemy)
    }

    case C: {
      return enemyTakesDmg(player, enemy)
    }

    case B: {
      return blockVsAttack(player, enemy)
    }

    case T:
    case R: {
      return playerTakesDmg(player, enemy)
    }

    default:
      // Return zero damage for both.
      return {
        player: 0,
        enemy: 0,
      }

  }
}

export function calcDamage(player, enemy) {
  if (player.action === A) {
    return playerAttacks(player, enemy)
  }
  if (enemy.action === A) {
    return enemyAttacks(player, enemy)
  }
  // Return zero damage for both.
  return {
    player: 0,
    enemy: 0,
  }
}
