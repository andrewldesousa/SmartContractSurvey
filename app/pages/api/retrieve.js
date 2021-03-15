export const retrieveQuestionsBySurvey = (SId) =>{
  return fetch(`${process.env.REACT_APP_API_URL}/getSurveyQuesitons/${SId}`, {
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
  return fetch(`${process.env.REACT_APP_API_URL}/user/getSurveyByOwner/${OId}`, {
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
  return fetch(`${process.env.REACT_APP_API_URL}/getSurvey/${SId}`, {
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
  return fetch(`${process.env.REACT_APP_API_URL}/getResponceCount`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      // 'Authorization': `Bearer ${token}`  --To imporve the security this may be added in the fucture
    },
    body: JSON.stringify({survey_id: Sid}),
  }).then( (response) => {
    return response.json();
  }).catch((err) => {
    console.log(err);
  });
}