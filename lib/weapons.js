const SWORDS = {
  type: 'Sword',
}

export const GLADIUS = {
  ...SWORDS,
  name: 'Gladius',
  attacks: {
    cut: 1,
    pierce: 2,
  },
}

export const SPATHA = {
  ...SWORDS,
  name: 'Spatha',
  attacks: {
    cut: 2,
    pierce: 1,
  },
}

const AXES = {
  type: 'Axe',
}

export const AXE = {
  ...AXES,
  name: 'Axe',
  attacks: {cut: 3},
}

const SPEARS = {
  type: 'Spear',
}

export const GER = {
  ...SPEARS,
  name: 'Ger',
  attacks: {pierce: 3},
}

const BLUNTS = {
  type: 'Blunt',
}

export const MACE = {
  ...BLUNTS,
  name: 'Mace',
  attacks: {bash: 3},
}
