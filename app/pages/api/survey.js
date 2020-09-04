const questionTypes = {
  NUMBER: 'number',
  SELECT_ONE: 'selectOne',
  SELECT_ONE_OR_OTHER: 'selectOneOrOther',
  SLIDER: 'slider',
  LIKERT: 'likert',
  TRUE_OR_FALSE: 'trueOrFalse',
};

export default (req, res) => {
  res.statusCode = 200;
  res.json({
    id: 0,
    author: 0,
    introduction: '-----Place holder introductory sentences -----',
    explanation: '-----Place holder explanation of the survey + smartcontract-based lottery',
    instructions: '-----Place holder fill out instructions -----',

    sections: [
      {
        title: 'Demographics',
        primer: '-----Place holder Info text about questions -----',
        questions: [
          {
            type: questionTypes.NUMBER,
            prompt: 'How old are you?',
          },
          {
            type: questionTypes.SELECT_ONE,
            prompt: 'What is your gender?',
            choices: [
              'Male',
              'Female',
              'Diverse',
              'Don\'t want to answer',
            ],
          },
          {
            type: questionTypes.SELECT_ONE_OR_OTHER,
            prompt: 'What is your background?',
            choices: [
              'Engineering',
              'Medicine',
              'Economics',
              'Computer Science',
            ],
          },
          {
            type: questionTypes.SELECT_ONE_OR_OTHER,
            prompt: 'What is your highest educational level?',
            choices: [
              'High school',
              'Bachelor',
              'Master',
            ],
          },
          {
            type: questionTypes.TRUE_OR_FALSE,
            prompt: 'Did you like school?',
            dependsOn: [-1],
          },
          {
            type: questionTypes.SLIDER,
            prompt: 'What is your level of knowledge about blockchain in general?',
          },
          {
            type: questionTypes.SLIDER,
            prompt: 'What is your level of ability to read solidity code?',
          },
          {
            type: questionTypes.SLIDER,
            prompt: 'What is your level of ability to read solidity code?',
          },
          {
            type: questionTypes.SLIDER,
            prompt: 'What is your level of knowledge about the Ethereum protocol and infrastructure?',
          },
          {
            type: questionTypes.LIKERT,
            prompt: 'I like to explore new DApps.',
          },
          {
            type: questionTypes.LIKERT,
            prompt: 'When I hear about a new DApp, I often find an excuse to go visit it.',
          },
          {
            type: questionTypes.LIKERT,
            prompt: 'Among my peers, I am usually the first to try out new DApps.',
          },
          {
            type: questionTypes.LIKERT,
            prompt: 'In general, I am not interested in trying out new DApps.',
          },
          {
            type: questionTypes.LIKERT,
            prompt: 'When I have some free time, I often explore new DApps.',
          },
        ],
      },
      {
        title: 'Disposition to trust',
        primer: '-----Place holder Info text about questions -----',
        questions: [
          {
            type: questionTypes.LIKERT,
            prompt: 'I think people generally try to back their words with their actions',
          },
          {
            type: questionTypes.LIKERT,
            prompt: 'In general, people really do care about the well-being of others.',
          },
          {
            type: questionTypes.LIKERT,
            prompt: 'I believe that most professional people do a very good job at their work.',
          },
          {
            type: questionTypes.LIKERT,
            prompt: 'Generally, I belief that technology can be relied upon.',
          },
          {
            type: questionTypes.LIKERT,
            prompt: 'The majority of technical applications are free of severe errors.',
          },
          {
            type: questionTypes.LIKERT,
            prompt: 'I think that most technical applications work as they are expected to.',
          },
          {
            type: questionTypes.LIKERT,
            prompt: 'My typical approach is to trust others until they prove I should not trust them.',
          },
          {
            type: questionTypes.LIKERT,
            prompt: 'I usually try out new technology before reading about its flaws.',
          },
          {
            type: questionTypes.LIKERT,
            prompt: 'I generally give new technology the benefit of the doubt when I first use it.',
          },
          {
            type: questionTypes.LIKERT,
            prompt: 'I think that most new technical applications work as they are expected to.',
          },
        ],
      },
    ],
  });
};
