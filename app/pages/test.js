import {retrieveQuestionsBySurvey, retrieveResponseCounts} from './api/retrieve';
import {retrieveSurveyByID, retrieveSurveyByOwner} from './api/retrieve';
import React from 'react';
import {submit, addQuestions} from './api/store';
export default function testApi() {
  /* const dataCount = retrieveResponseCounts('5f75097100494a44ac63e912','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQ4NjI1MmVmYmQ0YTBiMDAxMmFlN2EiLCJpYXQiOjE2MDE0OTI4MjB9.Hi5ekO8E5ElYTd1esAh1qOXPNzGBNMQIyZl-yaNoFWU')
  const survey = retrieveSurveyByID('5f75097100494a44ac63e912')
  const questions = retrieveQuestionsBySurvey('5f75097100494a44ac63e912')
  const surveyList = retrieveSurveyByOwner('5f486252efbd4a0b0012ae7a','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQ4NjI1MmVmYmQ0YTBiMDAxMmFlN2EiLCJpYXQiOjE1OTg1ODM3Njl9.kO72Z6zB1DZyLP3-c_zoCnZ-mQOK6o4jPRSKtsVarGg')
  console.log(dataCount)
  console.log(survey)
  console.log(questions)
  console.log(surveyList) */
  const dataToSubmit = {
    'responses': {
      'Q1': {'question_id': '5f8617eb1e34e23a3807fe48', 'answer': '#1 TEST NAME'}
    }
  }
  const questionsToAdd = {
    'questions': {
      'q1': {
        'survey_id': '5f75090900494a44ac63e90a',
        'question': 'TEST TEST TEST TEST TEST',
        'type': 'MCQ',
        'options': ['TEST','TEST']
      }
    }
  }
  const submitRes = submit(dataToSubmit, '5f75097100494a44ac63e912')
  const addQuestionRes = addQuestions(questionsToAdd, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQ4NjI1MmVmYmQ0YTBiMDAxMmFlN2EiLCJpYXQiOjE1OTg1ODM3Njl9.kO72Z6zB1DZyLP3-c_zoCnZ-mQOK6o4jPRSKtsVarGg')
  //console.log(submitRes)
  //console.log(addQuestionRes)
  return (
    <div>
      <h1>Test Page</h1>
    </div> )
} 