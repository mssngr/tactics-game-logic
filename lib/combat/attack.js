import {calcHit, calcDodge, landHit, nothing, recovering, recovered} from './combat'

/* eslint-disable max-len */
export function attack(player, enemy) {
  const enemyHit = calcHit(player, enemy)
  const playerHit = calcHit(enemy, player)
  if (enemyHit && playerHit) {
    console.log(`Both ${player.name} and ${enemy.name} land hits on each other.`)
    return {
      player: landHit(enemy),
      enemy: landHit(player),
    }
  }
  if (enemyHit) {
    console.log(`${player.name} lands a hit, but ${enemy.name}'s strike misses.`)
    return {
      player: recovering,
      enemy: landHit(player),
    }
  }
  if (playerHit) {
    console.log(`${enemy.name} lands a hit, but ${player.name}'s strike misses.`)
    return {
      player: landHit(enemy),
      enemy: recovering,
    }
  }
  return {
    player: recovering,
    enemy: recovering,
  }
}

export function block(player, enemy) {
  const enemyHit = calcHit(player, enemy, true)
  if (enemyHit) {
    console.log(`${player.name} broke through ${enemy.name}'s block and struck a blow.`)
    return {
      player: recovering,
      enemy: landHit(player),
    }
  }
  console.log(`${enemy.name} blocked ${player.name}'s attack.`)
  return {
    player: recovering,
    enemy: recovering,
  }
}

export function counter(player, enemy) {
  const playerHit = calcHit(enemy, player)
  if (playerHit) {
    console.log(`${enemy.name} countered ${player.name}'s attack!`)
    return {
      player: landHit(enemy),
      enemy: recovering,
    }
  }
  console.log(`${enemy.name} countered ${player.name}'s attack, but the return blow glanced off.`)
  return {
    player: recovering,
    enemy: recovering,
  }
}

export function dodge(player, enemy) {
  const dodgeSuccessful = calcDodge(enemy, player)
  if (dodgeSuccessful) {
    console.log(`${enemy.name} moved out of the way of ${player.name}'s attack just in time.`)
    return {
      player: recovering,
      enemy: nothing,
    }
  }
  console.log(`${enemy.name} tried to dodge, but was struck by ${enemy.name}.`)
  return {
    player: recovering,
    enemy: landHit(player),
  }
}

export function escape(player, enemy) { // eslint-disable-line no-shadow
  const enemyHit = calcHit(player, enemy)
  if (enemyHit) {
    console.log(`${player.name} landed a blow on ${enemy.name} while they fled.`)
    return {
      player: recovering,
      enemy: landHit(player),
    }
  }
  console.log(`${player.name}'s blow glanced off of ${enemy.name} as they fled.`)
  return {
    player: recovering,
    enemy: nothing,
  }
}

export function floor(player, enemy) {
  const enemyHit = calcHit(player, enemy)
  if (enemyHit) {
    console.log(`${player.name}'s blow foiled ${enemy.name}'s attempt to knock ${player.name} down.`)
    return {
      player: recovering,
      enemy: landHit(player),
    }
  }
  console.log(`${player.name}'s attack glanced off, but foiled ${enemy.name}'s attempt to trip.`)
  return {
    player: recovering,
    enemy: recovering,
  }
}

export function recover(player, enemy) {
  const enemyHit = calcHit(player, enemy)
  if (enemyHit) {
    console.log(`${player.name} landed a blow on ${enemy.name} while they were recovering.`)
    return {
      player: recovering,
      enemy: landHit(player),
    }
  }
  console.log(`${player.name}'s blow glanced off of ${enemy.name} emboldening their recovery.`)
  return {
    player: recovering,
    enemy: recovered,
  }
}
/* eslint-enable max-len */
