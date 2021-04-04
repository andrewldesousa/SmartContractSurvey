const QUESTION_TYPES = {
  'BINARY': 'binary',
  'LIKERT': 'likert',
  'DATE': 'date',
  'RATE': 'rate',
  'TEXT': 'text',
  'SLIDER': 'slider',
  'SLIDER_DISCRETE': 'sliderDiscrete',
  'SINGLE_CHOICE': 'singleChoice',
  'MULTIPLE_CHOICE': 'multipleChoice',
  'DROPDOWN': 'dropdown',
  'NUMERIC': 'numeric'
};

const QUESTION_INFO = [
  {type: 'binary', info : 'Select Yes or No'},
  {type: 'likert', info :'Choose a ratio'},
  {type: 'date',   info :'Choose a date'},
  {type: 'rate',   info :'Choose a ratio'},
  {type: 'text',   info :'Fill in the box with your text'},
  {type: 'slider', info :'Choose a value'},
  {type: 'sliderDiscrete', info : 'Choose a value'},
  {type: 'singleChoice',   info :'Select only one option'},
  {type: 'multipleChoice', info : 'Select every option that is correct'},
  {type: 'dropdown',info :'Select an option'},
  {type: 'numeric', info :'Enter a Number'}
];

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

export {QUESTION_TYPES, ADMIN_PROMPT_ONLY_TYPES , QUESTION_INFO};
