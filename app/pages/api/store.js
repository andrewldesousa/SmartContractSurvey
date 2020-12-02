export const addQuestions = (data, token)=>{
  return fetch(`${process.env.REACT_APP_API_URL}/store/storeQuestions`, {
    'method': 'POST',
    'headers': {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    'body': JSON.stringify(data),
  }).then( (response) => {
    console.log(response);
    return response.json();
  }).catch((err) => {
    console.log(err);
  });
};
// 
// still coming up
export const addOneQuestion = (data, token)=>{
  return fetch(`${process.env.REACT_APP_API_URL}/store/storeOneQuestion`, {
    'method': 'POST',
    'headers': {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    'body': JSON.stringify(data),
  }).then( (response) => {
    return response;
  }).catch((err) => {
    console.log(err);
  });
};

export const submit = (data)=>{
  return fetch(`${process.env.REACT_APP_API_URL}/store/storeResult`, {
    'method': 'PUT',
    'headers': {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    'body': JSON.stringify(data)
  }).then( (response) => {
    return response.json();
  }).catch((err) => {
    console.log(err);
  });
};
export const makeSurvey = (data, token)=>{
  return fetch(`${process.env.REACT_APP_API_URL}/store/createSurvey`, {
    'method': 'POST',
    'headers': {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    'body': JSON.stringify(data),
  }).then( (response) => {
    return response.json();
  }).catch((err) => {
    console.log(err);
  });
};
