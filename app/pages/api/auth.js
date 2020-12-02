export const signup = user => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
      .then(response => {
        return response.json();
      })
      .catch(err => {
        console.log(err)
        return response.json();
      });
};
export const signin = (input) => { 
    return fetch(`${process.env.REACT_APP_API_URL}/user/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const signout = (next) => {
  if (typeof window !== 'undefined') {
    // localStorage.removeItem('jwt');
    // next();
    const {token} = JSON.parse(localStorage.getItem('jwt'));
    return fetch(`http://localhost:8000/user/signout`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    })
        .then((response) => {
          console.log('signout', response);
          localStorage.removeItem('jwt');

        })
        .catch((err) => console.log(err));
  }
};

export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data));
    next();
  }
};


export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'));
  } else {
    return false;
  }
};
