import {
  BATCH_STUDENTS_FETCHED,
  FETCHED_ONE_STUDENT
} from '../actions/students/fetch'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case BATCH_STUDENTS_FETCHED :
      return [...payload]
    case FETCHED_ONE_STUDENT :
      return [...payload]

    default :
      return state
  }
}
