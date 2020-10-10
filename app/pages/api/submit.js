const responseSubmit = (data)=>{
  return fetch(`http://localhost:8000/storeResult`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: data
  }).then( (response) => {
    return response.json();
  }).catch(err => {
    console.log(err);
  });
};
export default responseSubmit;
