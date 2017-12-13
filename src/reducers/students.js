import {
  BATCH_STUDENTS_FETCHED
} from '../actions/students/fetch'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case BATCH_STUDENTS_FETCHED :
        return [...payload]

        default :
          return state
  }
}
