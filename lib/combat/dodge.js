import {calcHit, calcDodge landHit, nothing, recovering, recovered} from './combat'

/* eslint-disable max-len */
export function attack(player, enemy) {
  const dodgeSuccessful = calcDodge(player, enemy)
  if (dodgeSuccessful) {
    console.log(`${player.name} moved out of the way of ${enemy.name}'s attack just in time.`)
    return {
      player: nothing,
      enemy: recovering,
    }
  }
  console.log(`${player.name} tried to dodge, but was struck by ${enemy.name}.`)
  return {
    player: landHit(enemy),
    enemy: recovering,
  }
}

export function block(player, enemy) {
  return {
    player: nothing,
    enemy: nothing,
  }
}

export function counter(player, enemy) {
  return {
    player: nothing,
    enemy: nothing,
  }
}

export function dodge(player, enemy) {
  return {
    player: nothing,
    enemy: nothing,
  }
}

export function escape(player, enemy) { // eslint-disable-line no-shadow
  return {
    player: nothing,
    enemy: nothing,
  }
}

export function floor(player, enemy) {
  return {
    player: nothing,
    enemy: nothing,
  }
}

export function recover(player, enemy) {
  return {
    player: nothing,
    enemy: nothing,
  }
}
/* eslint-enable max-len */
