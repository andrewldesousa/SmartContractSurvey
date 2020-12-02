export const makeSurvey = (data, token)=> {
  return fetch(`http://localhost:8000/store/createSurvey`, {
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

export const addQuestions = (data, token)=> {
  return fetch(`http://localhost:8000/store/storeQuestions`, {
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
  return fetch(`http://localhost:8000/store/storeResult`, {
    'method': 'PUT',
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
