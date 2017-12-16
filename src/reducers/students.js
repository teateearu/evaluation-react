import {
  BATCH_STUDENTS_FETCHED,
  FETCHED_ONE_STUDENT,
  STUDENTS_FETCHED
} from '../actions/students/fetch'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case STUDENTS_FETCHED :
    return [...payload]

    case BATCH_STUDENTS_FETCHED :
      // return [...payload]
      return state.filter(student => student.batch_id === payload)
    case FETCHED_ONE_STUDENT :
      return [...payload]

    default :
      return state
  }
}
