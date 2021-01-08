import React from 'react';
import {withRouter} from 'next/router'
import Start from '../start'

const land=withRouter((props)=> {
  return <Start sid={props.router.query.sid} />
})
export default land;