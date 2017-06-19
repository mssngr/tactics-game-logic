import * as CONSTANTS from './constants'

const A = CONSTANTS.COMBAT_ACTIONS[0]
const C = CONSTANTS.COMBAT_ACTIONS[1]
const T = CONSTANTS.COMBAT_ACTIONS[2]
const B = CONSTANTS.COMBAT_ACTIONS[3]
const R = CONSTANTS.COMBAT_ACTIONS[4]

function print(statement) {
  return console.log(statement)
}

export function displayHealth(player, enemy) {
  return (
    print(
      `${player.name}'s health is ${player.health}.
      ${enemy.name}'s health is ${enemy.health}.`)
  )
}

export function displayCombatMessage(player, enemy, playerDamage, enemyDamage) {
  switch (player.action + enemy.action) {

    // Attack vs. Attack
    case A + A:
      console.log(`${player.name} and ${enemy.name} both attack.`)
      console.log(`${enemy.name} received ${enemyDamage} damage.`)
      console.log(`${player.name} received ${playerDamage} damage.`)
      return displayHealth(player, enemy)

    // Attack vs. Counter
    case A + C:
      console.log(`${enemy.name} counters ${player.name}'s attack.`)
      console.log(`${player.name} received ${playerDamage} damage.`)
      return displayHealth(player, enemy)

    // Attack vs. Trip
    case A + T:
      console.log(`${enemy.name} tries to trip ${player.name}, but gets attacked, instead.`)
      console.log(`${enemy.name} received ${enemyDamage} damage.`)
      return displayHealth(player, enemy)

    // Attack vs. Block
    case A + B:
      console.log(`${enemy.name} blocks ${player.name}'s attack.`)
      console.log(`${enemy.name} received ${enemyDamage} damage.`)
      return displayHealth(player, enemy)

    // Attack vs. Retreat
    case A + R:
      console.log(`${enemy.name} tries to get away while ${player.name} attacks.`)
      console.log(`${enemy.name} received ${enemyDamage} damage.`)
      console.log(`${enemy.name} has retreated.`)
      return displayHealth(player, enemy)

    // Counter vs. Attack
    case C + A:
      console.log(`${player.name} counters ${enemy.name}'s attack.`)
      console.log(`${enemy.name} received ${enemyDamage} damage.`)
      return displayHealth(player, enemy)

    // Counter vs. Counter
    case C + C:
      console.log(`${player.name} and ${enemy.name}
         both try to counter each other, to no effect.`)
      return displayHealth(player, enemy)

    // Counter vs. Trip
    case C + T:
      console.log(`${player.name} tries to counter attack, but gets tripped by ${enemy.name}.`)
      console.log(`${player.name} has fallen to the ground.`)
      return displayHealth(player, enemy)

    // Counter vs. Block
    case C + B:
      console.log(`${enemy.name} blocks ${player.name}'s attempt to counter attack.`)
      return displayHealth(player, enemy)

    // Counter vs. Retreat
    case C + R:
      console.log(`${enemy.name} retreats, while ${player.name}
         tries to counter an attack that never comes.`)
      console.log(`${enemy.name} has retreated.`)
      return displayHealth(player, enemy)

    // Trip vs. Attack
    case T + A:
      console.log(`${player.name} tries to trip ${enemy.name}, but gets attacked, instead.`)
      console.log(`${player.name} received ${playerDamage} damage.`)
      return displayHealth(player, enemy)

    // Trip vs. Counter
    case T + C:
      console.log(`${enemy.name} tries to counter attack, but gets tripped by ${player.name}.`)
      console.log(`${enemy.name} has fallen to the ground.`)
      return displayHealth(player, enemy)

    // Trip vs. Trip
    case T + T:
      console.log(`${player.name} and ${enemy.name} both try to trip each other, to no effect.`)
      return displayHealth(player, enemy)

    // Trip vs. Block
    case T + B:
      console.log(`${player.name} trips ${enemy.name} while they have their guard up.`)
      console.log(`${enemy.name} has fallen to the ground.`)
      return displayHealth(player, enemy)

    // Trip vs. Retreat
    case T + R:
      console.log(`${enemy.name} tries to run away, but gets tripped up by ${player.name}.`)
      console.log(`${enemy.name} has fallen to the ground.`)
      return displayHealth(player, enemy)

    // Block vs. Attack
    case B + A:
      console.log(`${player.name} blocks ${enemy.name}'s attack.`)
      console.log(`${player.name} received ${playerDamage} damage.`)
      return displayHealth(player, enemy)

    // Block vs. Counter
    case B + C:
      console.log(`${player.name} blocks ${enemy.name}'s attempt to counter attack.`)
      return displayHealth(player, enemy)

    // Block vs. Trip
    case B + T:
      console.log(`${enemy.name} trips ${player.name} while they have their guard up.`)
      console.log(`${player.name} has fallen to the ground.`)
      return displayHealth(player, enemy)

    // Block vs. Block
    case B + B:
      console.log(`${player.name} and ${enemy.name} both
         block against non-existent attacks. Nothing happens.`)
      return displayHealth(player, enemy)

    // Block vs. Retreat
    case B + R:
      console.log(`${enemy.name} retreats, while ${player.name}
         is busy blocking an attack that never comes.`)
      console.log(`${enemy.name} has retreated.`)
      return displayHealth(player, enemy)

    // Retreat vs. Attack
    case R + A:
      console.log(`${player.name} tries to get away while ${enemy.name} attacks.`)
      console.log(`${player.name} received ${playerDamage} damage.`)
      console.log(`${player.name} has retreated.`)
      return displayHealth(player, enemy)

    // Retreat vs. Counter
    case R + C:
      console.log(`${player.name} retreats, while ${enemy.name}
         tries to counter an attack that never comes.`)
      console.log(`${player.name} has retreated.`)
      return displayHealth(player, enemy)

    // Retreat vs. Trip
    case R + T:
      console.log(`${player.name} tries to run away, but gets tripped up by ${enemy.name}.`)
      console.log(`${player.name} has fallen to the ground.`)
      return displayHealth(player, enemy)

    // Retreat vs. Block
    case R + B:
      console.log(`${player.name} retreats, while ${enemy.name}
         is busy blocking an attack that never comes.`)
      console.log(`${player.name} has retreated.`)
      return displayHealth(player, enemy)

    // Retreat vs. Retreat
    case R + R:
      console.log('The combatants have both retreated.')
      return displayHealth(player, enemy)

    default:
      return displayHealth(player, enemy)

  }
}

export function calcPlayer(playerClone, enemyClone) {
  const player = playerClone
  const enemy = enemyClone
  let playerDamage = 0
  let enemyDamage = 0

  switch (player.action + enemy.action) {

    // Attack vs. Attack
    case A + A:
      // Calculate damage to enemy.
      enemyDamage = player.weapon.rating - enemy.armor.rating
      if (enemyDamage < 0) {
        enemyDamage = 0
      }
      enemy.health = enemy.health - enemyDamage
      // Calculate damage to player.
      playerDamage = enemy.weapon.rating - player.armor.rating
      if (playerDamage < 0) {
        playerDamage = 0
      }
      player.health = player.health - playerDamage
      return displayCombatMessage(player, enemy, playerDamage, enemyDamage)

    // Attack vs. Counter
    case A + C:
      // Calculate damage to player.
      playerDamage = enemy.weapon.rating - player.armor.rating
      if (playerDamage < 0) {
        playerDamage = 0
      }
      player.health = player.health - playerDamage
      return displayCombatMessage(player, enemy, playerDamage, enemyDamage)

    // Attack vs. Trip
    case A + T:
      // Calculate damage to enemy.
      enemyDamage = player.weapon.rating - enemy.armor.rating
      if (enemyDamage < 0) {
        enemyDamage = 0
      }
      enemy.health = enemy.health - enemyDamage
      return displayCombatMessage(player, enemy, playerDamage, enemyDamage)

    // Attack vs. Block
    case A + B:
      // Calculate damage to enemy.
      enemyDamage = player.weapon.rating - enemy.armor.rating - enemy.weapon.rating
      if (enemyDamage < 0) {
        enemyDamage = 0
      }
      enemy.health = enemy.health - enemyDamage
      return displayCombatMessage(player, enemy, playerDamage, enemyDamage)

    // Attack vs. Retreat
    case A + R:
      // Calculate damage to enemy.
      enemyDamage = player.weapon.rating - enemy.armor.rating
      if (enemyDamage < 0) {
        enemyDamage = 0
      }
      enemy.health = enemy.health - enemyDamage
      return displayCombatMessage(player, enemy, playerDamage, enemyDamage)

    // Counter vs. Attack
    case C + A:
      // Calculate damage to enemy.
      enemyDamage = player.weapon.rating - enemy.armor.rating
      if (enemyDamage < 0) {
        enemyDamage = 0
      }
      enemy.health = enemy.health - enemyDamage
      return displayCombatMessage(player, enemy, playerDamage, enemyDamage)

    // Counter vs. Counter
    case C + C:
      return displayCombatMessage(player, enemy, playerDamage, enemyDamage)

    // Counter vs. Trip
    case C + T:
      // Change player's status to 'Fallen'.
      player.status = 'Fallen'
      return displayCombatMessage(player, enemy, playerDamage, enemyDamage)

    // Counter vs. Block
    case C + B:
      return displayCombatMessage(player, enemy, playerDamage, enemyDamage)

    // Counter vs. Retreat
    case C + R:
      return displayCombatMessage(player, enemy, playerDamage, enemyDamage)

    // Trip vs. Attack
    case T + A:
      // Calculate damage to player.
      playerDamage = enemy.weapon.rating - player.armor.rating
      if (playerDamage < 0) {
        playerDamage = 0
      }
      player.health = player.health - playerDamage
      return displayCombatMessage(player, enemy, playerDamage, enemyDamage)

    // Trip vs. Counter
    case T + C:
      // Change enemy's status to 'Fallen'.
      enemy.status = 'Fallen'
      return displayCombatMessage(player, enemy, playerDamage, enemyDamage)

    // Trip vs. Trip
    case T + T:
      return displayCombatMessage(player, enemy, playerDamage, enemyDamage)

    // Trip vs. Block
    case T + B:
      // Change enemy's status to 'Fallen'.
      enemy.status = 'Fallen'
      return displayCombatMessage(player, enemy, playerDamage, enemyDamage)

    // Trip vs. Retreat
    case T + R:
      // Change enemy's status to 'Fallen'.
      enemy.status = 'Fallen'
      return displayCombatMessage(player, enemy, playerDamage, enemyDamage)

    // Block vs. Attack
    case B + A:
      // Calculate damage to player.
      playerDamage = enemy.weapon.rating - player.armor.rating - player.weapon.rating
      if (playerDamage < 0) {
        playerDamage = 0
      }
      player.health = player.health - playerDamage
      return displayCombatMessage(player, enemy, playerDamage, enemyDamage)

    // Block vs. Counter
    case B + C:
      return displayCombatMessage(player, enemy, playerDamage, enemyDamage)

    // Block vs. Trip
    case B + T:
      // Change player's status to 'Fallen'.
      player.status = 'Fallen'
      return displayCombatMessage(player, enemy, playerDamage, enemyDamage)

    // Block vs. Block
    case B + B:
      return displayCombatMessage(player, enemy, playerDamage, enemyDamage)

    // Block vs. Retreat
    case B + R:
      return displayCombatMessage(player, enemy, playerDamage, enemyDamage)

    // Retreat vs. Attack
    case R + A:
      // Calculate damage to player.
      playerDamage = enemy.weapon.rating - player.armor.rating
      if (playerDamage < 0) {
        playerDamage = 0
      }
      player.health = player.health - playerDamage
      return displayCombatMessage(player, enemy, playerDamage, enemyDamage)

    // Retreat vs. Counter
    case R + C:
      return displayCombatMessage(player, enemy, playerDamage, enemyDamage)

    // Retreat vs. Trip
    case R + T:
      // Change player's status to 'Fallen'.
      player.status = 'Fallen'
      return displayCombatMessage(player, enemy, playerDamage, enemyDamage)

    // Retreat vs. Block
    case R + B:
      return displayCombatMessage(player, enemy, playerDamage, enemyDamage)

    // Retreat vs. Retreat
    case R + R:
      return displayCombatMessage(player, enemy, playerDamage, enemyDamage)

    default:
      return playerClone

  }
}

export function calcEnemy(playerClone, enemyClone) {
  const player = playerClone
  const enemy = enemyClone
  let playerDamage
  let enemyDamage

  switch (player.action + enemy.action) {

    // Attack vs. Attack
    case A + A:
      // Calculate damage to enemy.
      enemyDamage = player.weapon.rating - enemy.armor.rating
      if (enemyDamage < 0) {
        enemyDamage = 0
      }
      enemy.health = enemy.health - enemyDamage
      // Calculate damage to player.
      playerDamage = enemy.weapon.rating - player.armor.rating
      if (playerDamage < 0) {
        playerDamage = 0
      }
      player.health = player.health - playerDamage
      return enemy

    // Attack vs. Counter
    case A + C:
      // Calculate damage to player.
      playerDamage = enemy.weapon.rating - player.armor.rating
      if (playerDamage < 0) {
        playerDamage = 0
      }
      player.health = player.health - playerDamage
      return enemy

    // Attack vs. Trip
    case A + T:
      // Calculate damage to enemy.
      enemyDamage = player.weapon.rating - enemy.armor.rating
      if (enemyDamage < 0) {
        enemyDamage = 0
      }
      enemy.health = enemy.health - enemyDamage
      return enemy

    // Attack vs. Block
    case A + B:
      // Calculate damage to enemy.
      enemyDamage = player.weapon.rating - enemy.armor.rating - enemy.weapon.rating
      if (enemyDamage < 0) {
        enemyDamage = 0
      }
      enemy.health = enemy.health - enemyDamage
      return enemy

    // Attack vs. Retreat
    case A + R:
      // Calculate damage to enemy.
      enemyDamage = player.weapon.rating - enemy.armor.rating
      if (enemyDamage < 0) {
        enemyDamage = 0
      }
      enemy.health = enemy.health - enemyDamage
      return enemy

    // Counter vs. Attack
    case C + A:
      // Calculate damage to enemy.
      enemyDamage = player.weapon.rating - enemy.armor.rating
      if (enemyDamage < 0) {
        enemyDamage = 0
      }
      enemy.health = enemy.health - enemyDamage
      return enemy

    // Counter vs. Counter
    case C + C:
      return enemy

    // Counter vs. Trip
    case C + T:
      // Change player's status to 'Fallen'.
      player.status = 'Fallen'
      return enemy

    // Counter vs. Block
    case C + B:
      return enemy

    // Counter vs. Retreat
    case C + R:
      return enemy

    // Trip vs. Attack
    case T + A:
      // Calculate damage to player.
      playerDamage = enemy.weapon.rating - player.armor.rating
      if (playerDamage < 0) {
        playerDamage = 0
      }
      player.health = player.health - playerDamage
      return enemy

    // Trip vs. Counter
    case T + C:
      // Change enemy's status to 'Fallen'.
      enemy.status = 'Fallen'
      return enemy

    // Trip vs. Trip
    case T + T:
      return enemy

    // Trip vs. Block
    case T + B:
      // Change enemy's status to 'Fallen'.
      enemy.status = 'Fallen'
      return enemy

    // Trip vs. Retreat
    case T + R:
      // Change enemy's status to 'Fallen'.
      enemy.status = 'Fallen'
      return enemy

    // Block vs. Attack
    case B + A:
      // Calculate damage to player.
      playerDamage = enemy.weapon.rating - player.armor.rating - player.weapon.rating
      if (playerDamage < 0) {
        playerDamage = 0
      }
      player.health = player.health - playerDamage
      return enemy

    // Block vs. Counter
    case B + C:
      return enemy

    // Block vs. Trip
    case B + T:
      // Change player's status to 'Fallen'.
      player.status = 'Fallen'
      return enemy

    // Block vs. Block
    case B + B:
      return enemy

    // Block vs. Retreat
    case B + R:
      return enemy

    // Retreat vs. Attack
    case R + A:
      // Calculate damage to player.
      playerDamage = enemy.weapon.rating - player.armor.rating
      if (playerDamage < 0) {
        playerDamage = 0
      }
      player.health = player.health - playerDamage
      return enemy

    // Retreat vs. Counter
    case R + C:
      return enemy

    // Retreat vs. Trip
    case R + T:
      // Change player's status to 'Fallen'.
      player.status = 'Fallen'
      return enemy

    // Retreat vs. Block
    case R + B:
      return enemy

    // Retreat vs. Retreat
    case R + R:
      return enemy

    default:
      return enemyClone

  }
}
