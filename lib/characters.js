import * as Weapons from './weapons'
import * as Armor from './armor'

function Character(name, health, weapon, armor) {
  this.name = name
  this.health = health
  this.weapon = weapon
  this.armor = armor
  this.status = 'Well'
  this.action = null
}

export const unwen = new Character('Unwén', 10, Weapons.rustySword, Armor.leatherArmor)
export const ulfric = new Character('Ulfric', 10, Weapons.ironSword, Armor.ironArmor)
