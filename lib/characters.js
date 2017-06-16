import * as Weapons from './weapons'
import * as Armor from './armor'

export function characterCreation(name, health, weapon, armor) {
  const character = {
    name: name,
    health: health,
    weapon: weapon,
    armor: armor,
    status: 'Well',
  }
  return character
}

export const unwen = characterCreation('Unwén', 10, Weapons.rustySword, Armor.leatherArmor)
export const ulfric = characterCreation('Ulfric', 10, Weapons.ironSword, Armor.ironArmor)
