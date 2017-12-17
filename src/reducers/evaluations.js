import { EVALUATIONS_FETCHED } from '../actions/evaluations/fetch'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case EVALUATIONS_FETCHED:
      return [ ...payload ]

    default: return state
  }
}
