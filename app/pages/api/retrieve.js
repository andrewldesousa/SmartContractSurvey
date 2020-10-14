export const retrieveQuestionsBySurvey = ( SId) =>{
  return fetch(`http://localhost:8000/getSurveyQuesitons/${SId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then( (response) => {
    return response.json();
  }).catch((err) => {
    console.log(err);
  });
};
// This function is not yet implemented in full
export const retrieveSurveyByOwner = (OId, token) => {
  return fetch(`http://localhost:8000/user/getSurveyByOwner/${OId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then( (response) => {
    return response.json();
  }).catch((err) => {
    console.log(err);
  });
}
export const retrieveSurveyByID = ( SId) =>{
  return fetch(`http://localhost:8000/getSurvey/${SId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then( (response) => {
    return response.json();
  }).catch((err) => {
    console.log(err);
  });
}
export const retrieveResponseCounts = (SId, token) => {
  return fetch(`http://localhost:8000/getResponceCount/${SId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      // 'Authorization': `Bearer ${token}`
    }
  }).then( (response) => {
    return response.json();
  }).catch((err) => {
    console.log(err);
  });
}