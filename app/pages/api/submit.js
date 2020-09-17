const responseSubmit = ()=>{
  return fetch(`http://localhost:8000/user/submit`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
}).then(response => {
    return true;
  }).catch(err => {
    console.log(err);
  });
}

export default responseSubmit;