const SWORDS = {
  type: 'Sword',
}

export const GLADIUS = {
  ...SWORDS,
  name: 'Gladius',
  attack: {
    'cut': 1,
    'pierce': 2,
  },
}

export const SPATHA = {
  ...SWORDS,
  name: 'Spatha',
  attack: {
    'cut': 2,
    'pierce': 1,
  },
}

const AXES = {
  type: 'Axe',
}

export const AXE = {
  ...AXES,
  name: 'Axe',
  attack: {'cut': 3},
}

const SPEARS = {
  type: 'Spear',
}

export const GER = {
  ...SPEARS,
  name: 'Ger',
  attack: {'pierce': 3},
}

const BLUNTS = {
  type: 'Blunt',
}

export const MACE = {
  ...BLUNTS,
  name: 'Mace',
  attack: {'bash': 3},
}
