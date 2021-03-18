const QUESTION_TYPES = {
  'BINARY': 'binary',
  'LIKERT': 'likert',
  'DATE': 'date',
  'RATE': 'rate',
  'TEXT': 'text',
  'SLIDER': 'slider',
  'SLIDER DISCRETE': 'sliderDiscrete',
  'SINGLE CHOICE': 'singleChoice',
  'MULTIPLE CHOICE': 'multipleChoice',
  'DROPDOWN': 'dropdown',
  'NUMERIC': 'numeric'
};

const ADMIN_PROMPT_ONLY_TYPES = {
  BINARY: 'binary',
  LIKERT: 'likert',
  DATE: 'date',
  RATE: 'rate',
  TEXT: 'text',
  SLIDER: 'slider',
  SLIDERDISCRETE: 'sliderDiscrete',
  WALLET: 'wallet',
  NUMERIC: 'numeric'
};

export {QUESTION_TYPES, ADMIN_PROMPT_ONLY_TYPES};
