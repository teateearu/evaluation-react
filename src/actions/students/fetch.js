import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'
export const BATCH_STUDENTS_FETCHED = 'BATCH_STUDENTS_FETCHED'
export const FETCHED_ONE_STUDENT = 'FETCHED_ONE_STUDENT'
export const RANDOM_STUDENT_FETCHED = 'RANDOM_STUDENT_FETCHED'
export const STUDENTS_FETCHED = 'STUDENTS_FETCHED'
const api = new API()

const _fetchStudents = () => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.get('/students')
      .then((result) => {
        console.log(result)
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: STUDENTS_FETCHED,
          payload: result.body
        })

      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
export const fetchStudents = _fetchStudents;
export default _fetchStudents;

export const fetchOneStudent = (studentId) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

    api.get(`/students/${studentId}`)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: FETCHED_ONE_STUDENT,
          payload: result.body
        })

      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
export const fetchBatchStudents = (batchId) => {
  return (dispatch) => {
    dispatch({
      type: BATCH_STUDENTS_FETCHED,
      payload: batchId
    })
  }
}

export const randomStudent = (lastStudentEvaluations) => {
  return (dispatch) => {
    dispatch({
      type: RANDOM_STUDENT_FETCHED,
      payload: lastStudentEvaluations
    })
  }
}
