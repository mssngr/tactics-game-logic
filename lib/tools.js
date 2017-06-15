import * as CONSTANTS from './constants'

const A = CONSTANTS.COMBAT_ACTIONS[0]
const C = CONSTANTS.COMBAT_ACTIONS[1]
const T = CONSTANTS.COMBAT_ACTIONS[2]
const B = CONSTANTS.COMBAT_ACTIONS[3]
const R = CONSTANTS.COMBAT_ACTIONS[4]

export function displayHealth(info, playerDamage, opponentDamage) {
  const {
    player,
    playerAction,
    opponent,
    opponentAction,
  } = info
  console.log(`${player.name}'s health is ${player.health - playerDamage}.`)
  console.log(`${opponent.name}'s health is ${opponent.health - opponentDamage}.`)
}

export function displayCombatMessage(info, playerDamage, opponentDamage) {
  const {
    player,
    playerAction,
    opponent,
    opponentAction,
  } = info
  switch (playerAction + opponentAction) {

    // Attack vs. Attack
    case A + A:
      console.log(`${player.name} and ${opponent.name} both attack.`)
      console.log(`${opponent.name} received ${opponentDamage} damage.`)
      console.log(`${player.name} received ${playerDamage} damage.`)
      displayHealth(info, playerDamage, opponentDamage)
      break

    // Attack vs. Counter
    case A + C:
      console.log(`${opponent.name} counters ${player.name}'s attack.`)
      console.log(`${player.name} received ${playerDamage} damage.`)
      break

    // Attack vs. Trip
    case A + T:
      console.log(`${opponent.name} tries to trip ${player.name}, but gets attacked, instead.`)
      console.log(`${opponent.name} received ${opponentDamage} damage.`)
      break

    // Attack vs. Block
    case A + B:
      console.log(`${opponent.name} blocks ${player.name}'s attack.`)
      console.log(`${opponent.name} received ${opponentDamage} damage.`)
      break

    // Attack vs. Retreat
    case A + R:
      console.log(`${opponent.name} tries to get away while ${player.name} attacks.`)
      console.log(`${opponent.name} received ${opponentDamage} damage.`)
      console.log(`${opponent.name} has retreated.`)
      break

    // Counter vs. Attack
    case C + A:
      console.log(`${player.name} counters ${opponent.name}'s attack.`)
      console.log(`${opponent.name} received ${opponentDamage} damage.`)
      break

    // Counter vs. Counter
    case C + C:
      console.log(`${player.name} and ${opponent.name}
         both try to counter each other, to no effect.`)
      break

    // Counter vs. Trip
    case C + T:
      console.log(`${player.name} tries to counter attack, but gets tripped by ${opponent.name}.`)
      console.log(`${player.name} has fallen to the ground.`)
      break

    // Counter vs. Block
    case C + B:
      console.log(`${opponent.name} blocks ${player.name}'s attempt to counter attack.`)
      break

    // Counter vs. Retreat
    case C + R:
      console.log(`${opponent.name} retreats, while ${player.name}
         tries to counter an attack that never comes.`)
      console.log(`${opponent.name} has retreated.`)
      break

    // Trip vs. Attack
    case T + A:
      console.log(`${player.name} tries to trip ${opponent.name}, but gets attacked, instead.`)
      console.log(`${player.name} received ${playerDamage} damage.`)
      break

    // Trip vs. Counter
    case T + C:
      console.log(`${opponent.name} tries to counter attack, but gets tripped by ${player.name}.`)
      console.log(`${opponent.name} has fallen to the ground.`)
      break

    // Trip vs. Trip
    case T + T:
      console.log(`${player.name} and ${opponent.name} both try to trip each other, to no effect.`)
      break

    // Trip vs. Block
    case T + B:
      console.log(`${player.name} trips ${opponent.name} while they have their guard up.`)
      console.log(`${opponent.name} has fallen to the ground.`)
      break

    // Trip vs. Retreat
    case T + R:
      console.log(`${opponent.name} tries to run away, but gets tripped up by ${player.name}.`)
      console.log(`${opponent.name} has fallen to the ground.`)
      break

    // Block vs. Attack
    case B + A:
      console.log(`${player.name} blocks ${opponent.name}'s attack.`)
      console.log(`${player.name} received ${playerDamage} damage.`)
      break

    // Block vs. Counter
    case B + C:
      console.log(`${player.name} blocks ${opponent.name}'s attempt to counter attack.`)
      break

    // Block vs. Trip
    case B + T:
      console.log(`${opponent.name} trips ${player.name} while they have their guard up.`)
      console.log(`${player.name} has fallen to the ground.`)
      break

    // Block vs. Block
    case B + B:
      console.log(`${player.name} and ${opponent.name} both
         block against non-existent attacks. Nothing happens.`)
      break

    // Block vs. Retreat
    case B + R:
      console.log(`${opponent.name} retreats, while ${player.name}
         is busy blocking an attack that never comes.`)
      console.log(`${opponent.name} has retreated.`)
      break

    // Retreat vs. Attack
    case R + A:
      console.log(`${player.name} tries to get away while ${opponent.name} attacks.`)
      console.log(`${player.name} received ${playerDamage} damage.`)
      console.log(`${player.name} has retreated.`)
      break

    // Retreat vs. Counter
    case R + C:
      console.log(`${player.name} retreats, while ${opponent.name}
         tries to counter an attack that never comes.`)
      console.log(`${player.name} has retreated.`)
      break

    // Retreat vs. Trip
    case R + T:
      console.log(`${player.name} tries to run away, but gets tripped up by ${opponent.name}.`)
      console.log(`${player.name} has fallen to the ground.`)
      break

    // Retreat vs. Block
    case R + B:
      console.log(`${player.name} retreats, while ${opponent.name}
         is busy blocking an attack that never comes.`)
      console.log(`${player.name} has retreated.`)
      break

    // Retreat vs. Retreat
    case R + R:
      console.log('The combatants have both retreated.')
      break

    default:
      break

  }
}

export function calcCombat(player, playerAction, opponent, opponentAction) {
  let playerDamage
  let opponentDamage
  const info = {
    player,
    playerAction,
    opponent,
    opponentAction,
  }

  switch (playerAction + opponentAction) {

    // Attack vs. Attack
    case A + A:
      // Calculate damage to opponent.
      opponentDamage = player.weapon.rating - opponent.armor.rating
      if (opponentDamage < 0) {
        opponentDamage = 0
      }
      opponent.health = opponent.health - opponentDamage
      // Calculate damage to player.
      playerDamage = opponent.weapon.rating - player.armor.rating
      if (playerDamage < 0) {
        playerDamage = 0
      }
      player.health = player.health - opponentDamage
      displayCombatMessage(info, playerDamage, opponentDamage)
      break

    // Attack vs. Counter
    case A + C:
      // Calculate damage to player.
      playerDamage = opponent.weapon.rating - player.armor.rating
      if (playerDamage < 0) {
        playerDamage = 0
      }
      player.health = player.health - opponentDamage
      displayCombatMessage(info)
      break

    // Attack vs. Trip
    case A + T:
      // Calculate damage to opponent.
      opponentDamage = player.weapon.rating - opponent.armor.rating
      if (opponentDamage < 0) {
        opponentDamage = 0
      }
      opponent.health = opponent.health - opponentDamage
      displayCombatMessage(info)
      break

    // Attack vs. Block
    case A + B:
      // Calculate damage to opponent.
      opponentDamage = player.weapon.rating - opponent.armor.rating - opponent.weapon.rating
      if (opponentDamage < 0) {
        opponentDamage = 0
      }
      opponent.health = opponent.health - opponentDamage
      displayCombatMessage(info)
      break

    // Attack vs. Retreat
    case A + R:
      // Calculate damage to opponent.
      opponentDamage = player.weapon.rating - opponent.armor.rating
      if (opponentDamage < 0) {
        opponentDamage = 0
      }
      opponent.health = opponent.health - opponentDamage
      displayCombatMessage(info)
      break

    // Counter vs. Attack
    case C + A:
      // Calculate damage to opponent.
      opponentDamage = player.weapon.rating - opponent.armor.rating
      if (opponentDamage < 0) {
        opponentDamage = 0
      }
      opponent.health = opponent.health - opponentDamage
      displayCombatMessage(info)
      break

    // Counter vs. Counter
    case C + C:
      displayCombatMessage(info)
      break

    // Counter vs. Trip
    case C + T:
      // Change player's status to 'Fallen'.
      player.status = 'Fallen'
      displayCombatMessage(info)
      break

    // Counter vs. Block
    case C + B:
      displayCombatMessage(info)
      break

    // Counter vs. Retreat
    case C + R:
      displayCombatMessage(info)
      break

    // Trip vs. Attack
    case T + A:
      // Calculate damage to player.
      playerDamage = opponent.weapon.rating - player.armor.rating
      if (playerDamage < 0) {
        playerDamage = 0
      }
      player.health = player.health - playerDamage
      displayCombatMessage(info)
      break

    // Trip vs. Counter
    case T + C:
      // Change opponent's status to 'Fallen'.
      opponent.status = 'Fallen'
      displayCombatMessage(info)
      break

    // Trip vs. Trip
    case T + T:
      displayCombatMessage(info)
      break

    // Trip vs. Block
    case T + B:
      // Change opponent's status to 'Fallen'.
      opponent.status = 'Fallen'
      displayCombatMessage(info)
      break

    // Trip vs. Retreat
    case T + R:
      // Change opponent's status to 'Fallen'.
      opponent.status = 'Fallen'
      displayCombatMessage(info)
      break

    // Block vs. Attack
    case B + A:
      // Calculate damage to player.
      playerDamage = opponent.weapon.rating - player.armor.rating - player.weapon.rating
      if (playerDamage < 0) {
        playerDamage = 0
      }
      player.health = player.health - playerDamage
      displayCombatMessage(info)
      break

    // Block vs. Counter
    case B + C:
      displayCombatMessage(info)
      break

    // Block vs. Trip
    case B + T:
      // Change player's status to 'Fallen'.
      player.status = 'Fallen'
      displayCombatMessage(info)
      break

    // Block vs. Block
    case B + B:
      displayCombatMessage(info)
      break

    // Block vs. Retreat
    case B + R:
      displayCombatMessage(info)
      break

    // Retreat vs. Attack
    case R + A:
      // Calculate damage to player.
      playerDamage = opponent.weapon.rating - player.armor.rating
      if (playerDamage < 0) {
        playerDamage = 0
      }
      player.health = player.health - playerDamage
      displayCombatMessage(info)
      break

    // Retreat vs. Counter
    case R + C:
      displayCombatMessage(info)
      break

    // Retreat vs. Trip
    case R + T:
      // Change player's status to 'Fallen'.
      player.status = 'Fallen'
      displayCombatMessage(info)
      break

    // Retreat vs. Block
    case R + B:
      displayCombatMessage(info)
      break

    // Retreat vs. Retreat
    case R + R:
      displayCombatMessage(info)
      break

    default:
      break

  }
}
