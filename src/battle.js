import readlineSync from 'readline-sync'
import {unwen, ulfric} from '../lib/characters'
import {calcPlayer, calcEnemy} from '../lib/tools2'
import * as CONSTANTS from '../lib/constants'

const A = CONSTANTS.COMBAT_ACTIONS.A
const C = CONSTANTS.COMBAT_ACTIONS.C
const T = CONSTANTS.COMBAT_ACTIONS.T
const B = CONSTANTS.COMBAT_ACTIONS.B
const R = CONSTANTS.COMBAT_ACTIONS.R

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
