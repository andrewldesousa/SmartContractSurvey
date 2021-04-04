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
  {type: 'binary', info : 'Specify a Yes/No question which will be populated for the following.'},
  {type: 'likert', info :'Specify the question for a 5-point likert.'},
  {type: 'date',   info :'Specify a question for which you need the date.'},
  {type: 'rate',   info :'Specify a question for a 5-star scale.'},
  {type: 'text',   info :'Specify a question for which text based answer.'},
  {type: 'slider', info :'Specify a question for numerical input between 1-100.'},
  {type: 'sliderDiscrete', info : 'Specify a question for numerical input between 1-100.'},
  {type: 'singleChoice',   info :'Specify a question and than provide options below corresponding to the choices.'},
  {type: 'multipleChoice', info : 'Specify a question and than provide options below corresponding to the choices.'},
  {type: 'dropdown',info :'Specify a question and than provide options below corresponding to the choices.'},
  {type: 'numeric', info :'Specify a question for which you only need integer responses. Textual answers will not be accepted.'}
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
