export const responseSubmit = ()=>{
  return fetch(`http://localhost:8000/user/submit`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
}).then((response) => {
    return true;
  }).catch((err) => {
    console.log(err);
  });
}
/*
 *This funciton is where the api call to the backend will be added 
 *The function will push the data in json format either for inidual tables for question or
 *as a single json file per responce. */

export default responseSubmit;

