export const retrieveQuestionsBySurvey = ( SId, token) =>{
  return fetch(`http://localhost:8000/storeResult`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: { 
      S_id: SId,
    }
  }).then( (response) => {
    return response.json();
  }).catch((err) => {
    console.log(err);
  });
}
export const retrieveSurveyByOwner = (OId, token) => {
  return fetch(`http://localhost:8000/storeResult`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: { 
      Oid: OId
    }
  }).then( (response) => {
    return response.json();
  }).catch((err) => {
    console.log(err);
  });
}
export const retrieveSurveyByID = ( SId, token) =>{
  return fetch(`http://localhost:8000/storeResult`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: { 
      S_id: SId,
    }
  }).then( (response) => {
    return response.json();
  }).catch((err) => {
    console.log(err);
  });
}
export const retrieveResponseCounts = (SId, token) => {
  return fetch(`http://localhost:8000/storeResult`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: { 
      S_id: SId,
    }
  }).then( (response) => {
    return response.json();
  }).catch((err) => {
    console.log(err);
  });
}