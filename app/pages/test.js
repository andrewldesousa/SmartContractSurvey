import {retrieveQuestionsBySurvey, retrieveResponseCounts} from './api/retrieve';
import {retrieveSurveyByID, retrieveSurveyByOwner} from './api/retrieve';
import React from 'react';
export default function testApi() {
  const dataCount = retrieveResponseCounts('5f75097100494a44ac63e912','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQ4NjI1MmVmYmQ0YTBiMDAxMmFlN2EiLCJpYXQiOjE2MDE0OTI4MjB9.Hi5ekO8E5ElYTd1esAh1qOXPNzGBNMQIyZl-yaNoFWU')
  const survey = retrieveSurveyByID('5f75097100494a44ac63e912')
  const questions = retrieveQuestionsBySurvey('5f75097100494a44ac63e912')
  const surveyList = retrieveSurveyByOwner('5f486252efbd4a0b0012ae7a','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQ4NjI1MmVmYmQ0YTBiMDAxMmFlN2EiLCJpYXQiOjE1OTg1ODM3Njl9.kO72Z6zB1DZyLP3-c_zoCnZ-mQOK6o4jPRSKtsVarGg')
  console.log(dataCount)
  console.log(survey)
  console.log(questions)
  console.log(surveyList)
  return (
    <div>
      <h1>Test Page</h1>
      <br></br><hr></hr><br></br>
      <p>{JSON.stringify(survey)} </p>
    </div> )
} 