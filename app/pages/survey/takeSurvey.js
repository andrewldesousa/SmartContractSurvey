import React from 'react'
import {withRouter} from 'next/router';
import {View} from './view'

const takeSurvey = withRouter((props)=>{
  console.log(props.router.query.sid)
  return <View sid={props.router.query.sid}></View>;
})

export default takeSurvey;