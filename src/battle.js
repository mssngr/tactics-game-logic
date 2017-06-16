import readlineSync from 'readline-sync'
import {unwen, ulfric} from '../lib/characters'
import {calcPlayer, calcEnemy} from '../lib/tools2'
import * as CONSTANTS from '../lib/constants'

const A = CONSTANTS.COMBAT_ACTIONS[0]
const C = CONSTANTS.COMBAT_ACTIONS[1]
const T = CONSTANTS.COMBAT_ACTIONS[2]
const B = CONSTANTS.COMBAT_ACTIONS[3]
const R = CONSTANTS.COMBAT_ACTIONS[4]

const player = unwen
const enemy = ulfric

console.log(`
You are ${player.name}.
You hold a ${player.weapon.name}.
You wear ${player.armor.name}
You are engaged in battle. Prepare yourself.`)

console.log(`
Your health is ${player.health}.
Your enemy's is ${enemy.health}.`)

action = readlineSync.keyInSelect(CONSTANTS.COMBAT_ACTIONS, 'What do you choose to do?')
player.action = CONSTANTS.COMBAT_ACTIONS[action]
calcPlayer(player, enemy)

console.log(`
Your health is ${player.health}.
Your enemy's is ${enemy.health}.`)

action = readlineSync.keyInSelect(CONSTANTS.COMBAT_ACTIONS, 'What do you choose to do?')
player.action = CONSTANTS.COMBAT_ACTIONS[action]
calcPlayer(player, enemy)

console.log(`
Your health is ${player.health}.
Your enemy's is ${enemy.health}.`)
