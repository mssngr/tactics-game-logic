import {calcHit, landHit, nothing, recovering, recovered} from './combat'

/* eslint-disable max-len */
export function attack(player, enemy) {
  const playerHit = calcHit(enemy, player, true)
  if (playerHit) {
    console.log(`${enemy.name} broke through ${player.name}'s block and struck a blow.`)
    return {
      player: landHit(enemy),
      enemy: recovering,
    }
  }
  console.log(`${player.name} blocked ${enemy.name}'s attack.`)
  return {
    player: nothing,
    enemy: recovering,
  }
}

export function block(player, enemy) {
  console.log(`${player.name} blocked at the same moment ${enemy.name} did. Nothing happened.`)
  return {
    player: nothing,
    enemy: nothing,
  }
}

export function counter(player, enemy) {
  console.log(`${player.name} blocked while ${enemy.name} waited to counter any moves.`)
  return {
    player: nothing,
    enemy: recovering,
  }
}

export function dodge(player, enemy) {
  console.log(`${enemy.name} dodged a non-existent attack as ${player.name} blocked.`)
  return {
    player: nothing,
    enemy: nothing,
  }
}

export function escape(player, enemy) { // eslint-disable-line no-shadow
  console.log(`${enemy.name} got away while ${player.name} blocked.`)
  return {
    player: nothing,
    enemy: nothing,
  }
}

export function floor(player, enemy) {
  console.log(`${enemy.name} tripped ${player.name} while they were blocking.`)
  return {
    player: recovering,
    enemy: nothing,
  }
}

export function recover(player, enemy) {
  console.log(`${player.name} blocked while ${enemy.name} was recovering. Strange.`)
  return {
    player: nothing,
    enemy: recovered,
  }
}
/* eslint-enable max-len */
