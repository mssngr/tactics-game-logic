export const COMBAT_ACTIONS = [
  'Attack',
  'Block',
  'Counter',
  'Dodge',
  'Escape',
  'Floor',
]

export const RECOVER = ['Recover']

export const COMBAT_CHOICE = {
  A: COMBAT_ACTIONS[0],
  B: COMBAT_ACTIONS[1],
  C: COMBAT_ACTIONS[2],
  D: COMBAT_ACTIONS[3],
  E: COMBAT_ACTIONS[4],
  F: COMBAT_ACTIONS[5],
  R: RECOVER[0],
}

export const ATTACK_TYPE = {
  CUT: 'cut',
  PIERCE: 'pierce',
  BASH: 'bash',
}

export const CONDITION = {
  WELL: 'healthy',
  BLEEDING: 'bleeding',
  HEMORRHAGING: 'hemorrhaging',
  INTERNAL_BLEEDING: 'bleeding internally',
}

export const STATUS = {
  READY: 'ready to act',
  RECOVERING: 'recovering',
}
