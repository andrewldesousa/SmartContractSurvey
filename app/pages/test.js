import {retrieveQuestionsBySurvey, retrieveResponseCounts} from './api/retrieve';
import {retrieveSurveyByID, retrieveSurveyByOwner} from './api/retrieve';
import React from 'react';
import {submit, addQuestions, makeSurvey, addOneQuestion} from './api/store';
export default function testApi() {
  const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQ4NjI1MmVmYmQ0YTBiMDAxMmFlN2EiLCJpYXQiOjE2MDE0OTI4MjB9.Hi5ekO8E5ElYTd1esAh1qOXPNzGBNMQIyZl-yaNoFWU'
  // Retrival OF THE REQUESTS FREQUENCIES OF THE SURVEY BY SURVEY_ID
  const dataCount = retrieveResponseCounts('5f75097100494a44ac63e912',token)
  // GET THE BASIC INFO ABOUT THE SURVEY - DESCRIPTION,ID...
  const survey = retrieveSurveyByID('5f75097100494a44ac63e912')
  // BY SURVEY_ID GETTING ALL QUESTIONS OF A SURVEY 
  const questions = retrieveQuestionsBySurvey('5f75097100494a44ac63e912')
  // GETTING ALL SURVEYS OF AN INDIVIDUAL USER 
  const surveyList = retrieveSurveyByOwner('5f486252efbd4a0b0012ae7a',token)
  // SUBMITTING ALL RESPONSES FORMAT FOR ALL JSON OBJECTS TO BE HELD  
  const dataToSubmit = {
    'responses': {
      'Q1': {'question_id': '5f8617eb1e34e23a3807fe48', 'answer': '#1 TEST NAME'},
      'Q2': {'question_id': '5f8617eb1e34e23a3807fe47', 'answer': '75'}
    }
  }
  const submitRes = submit(dataToSubmit, '5f75097100494a44ac63e912')
  // ADDING QUESTIONS IN BULK TO A SURVEY
  const questionsToAdd = {
    'questions': {
      'q1': {
        'survey_id': '5f75090900494a44ac63e90a',
        'question': 'TEST TEST TEST TEST TEST',
        'type': 'MCQ'
      }
    }
  }
  const addQuestionRes = addQuestions(questionsToAdd, token)
  // ADDING A NEW SURVEY
  const newSurvey={
    'description': 'Test #1 for api' 
  }
  // ADDING A SINGLE QUESTION
  const singleQuestion={ 
    'question': {
      'survey_id': '5f75090900494a44ac63e90a',
      'question': 'Choose one testing postman _4?',
      'type': 'MCQ',
      'options': ['A','B']
    }
  }

  return (
    <div>
      <h1>Test Page</h1>
      <p>{survey.data}</p>
    </div> )
} 