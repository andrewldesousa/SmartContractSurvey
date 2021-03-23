// import React from 'react'
// import {withRouter} from 'next/router';
// import {View} from './view'

// const takeSurvey = withRouter((props)=>{
//   const temp = props.router.query.sid
//   return View(temp);
// })

// export default takeSurvey;
import React from 'react';
import {withRouter} from 'next/router'
import View from './view'

const takeSurvey = withRouter((props)=> {
  return <View sid={props.router.query.sid} />
})
export default takeSurvey;