import random from 'lodash.random'
import {calcHit, landHit, nothing, recovering, recovered} from './combat'

/* eslint-disable max-len */
export function attack(player, enemy) {
  const enemyHit = calcHit(player, enemy)
  if (enemyHit) {
    console.log(`${player.name} countered ${enemy.name}'s attack!`)
    return {
      player: recovering,
      enemy: landHit(player),
    }
  }
  console.log(`${player.name} countered ${enemy.name}'s attack, but the return blow glanced off.`)
  return {
    player: recovering,
    enemy: recovering,
  }
}

export function block(player, enemy) {
  console.log(`${enemy.name} blocked while ${player.name} tried to counter a non-existent move.`)
  return {
    player: nothing,
    enemy: recovering,
  }
}

export function counter(player, enemy) {
  const playerProficiency = player.proficiency[player.weapon.type]
  const playerArmor = player.armor.protection[Object.keys(enemy.weapon.attack)]
  const enemyProficiency = enemy.proficiency[enemy.weapon.type]
  const enemyArmor = enemy.armor.protection[Object.keys(player.weapon.attack)]
  const playerChance = (playerProficiency / enemyArmor) / 2
  const enemyChance = (enemyProficiency / playerArmor) / 2
  function enemyHit() {
    console.log(`Both ${player.name} and ${enemy.name} try to counter each other, but only ${player.name} lands a blow.`)
    return {
      player: recovering,
      enemy: landHit(player),
    }
  }
  function playerHit() {
    console.log(`Both ${enemy.name} and ${player.name} try to counter each other, but only ${enemy.name} lands a blow.`)
    return {
      player: landHit(enemy),
      enemy: recovering,
    }
  }
  if (playerChance > enemyChance) {
    return enemyHit()
  }
  if (playerChance < enemyChance) {
    return playerHit()
  }
  if (playerChance === enemyChance) {
    // Flip a coin.
    const coinFlip = random(0, 1)
    if (coinFlip === 0) {
      return enemyHit()
    }
    else {
      return playerHit()
    }
  }
  return {
    player: recovering,
    enemy: recovering,
  }
}

export function dodge(player, enemy) {
  console.log(`${player.name} tried to counter, however ${enemy.name} moved away from danger.`)
  return {
    player: recovering,
    enemy: nothing,
  }
}

export function escape(player, enemy) { // eslint-disable-line no-shadow
  console.log(`${player.name} tried to counter while ${enemy.name} escaped.`)
  return {
    player: recovering,
    enemy: nothing,
  }
}

export function floor(player, enemy) {
  const enemyHit = calcHit(player, enemy)
  if (enemyHit) {
    console.log(`${enemy.name} tried to knock ${player.name} down, but got counter-attacked, instead.`)
    return {
      player: recovering,
      enemy: landHit(player),
    }
  }
  console.log(`${player.name} tried to counter ${enemy.name}'s attempts at knocking down, but both fighters failed.`)
  return {
    player: recovering,
    enemy: recovering,
  }
}

export function recover(player, enemy) {
  console.log(`${player.name} tried to counter a non-existent attack while ${enemy.name} recovered.`)
  return {
    player: recovering,
    enemy: recovered,
  }
}
/* eslint-enable max-len */
