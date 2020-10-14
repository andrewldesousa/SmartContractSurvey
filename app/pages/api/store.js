export const addQuestions = (data, token)=>{
  return fetch(`http://localhost:8000/store/storeQuestions`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: data
    //mode: 'cors'
  }).then( (response) => {
    return response.json();
  }).catch((err) => {
    console.log(err);
  });
};

export const submit = (data)=>{
  return fetch(`http://localhost:8000/store/storeResult`, {
    'method': 'PUT',
    'headers': {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    'body': data
  }).then( (response) => {
    return response.json();
  }).catch((err) => {
    console.log(err);
  });
};