import {retrieveQuestionsBySurvey, retrieveSurveyByID, retrieveSurveyByOwner} from '../api/retrieve'



export async function getProps(context) {
  const data = retrieveQuestionsBySurvey(Sid)
  return {
    props: {
      name: name,
      email: email,
      surveyList: surveyList,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllSurveyIds()
  return {
    paths,
    fallback: false
  }
}