import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchOneBatch, fetchStudents } from '../actions/batches/fetch'
import JoinBatchDialog from '../components/batches/JoinBatchDialog'

const studentShape = PropTypes.shape({
  userId: PropTypes.string.isRequired,
  pairs: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string
})

class Batch extends PureComponent {
  static propTypes = {
    fetchOneBatch: PropTypes.func.isRequired,
    fetchStudents: PropTypes.func.isRequired,
    batch: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      students: PropTypes.arrayOf(studentShape),
      draw: PropTypes.bool,
      updatedAt: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      started: PropTypes.bool,
      turn: PropTypes.number.isRequired,
      cards: PropTypes.arrayOf(PropTypes.shape({
        symbol: PropTypes.string,
        _id: PropTypes.string,
        won: PropTypes.bool,
        visible: PropTypes.bool
      }))
    }),
    currentStudent: studentShape,
    isStudent: PropTypes.bool,
    isJoinable: PropTypes.bool,
    hasTurn: PropTypes.bool
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    const { batch } = nextProps

    if (batch && !batch.students[0].name) {
      this.props.fetchStudents(batch)
    }
  }

  render() {
    const { batch } = this.props

    if (!batch) return null


    return (
      <div className="Batch">
        <h1>Batch!</h1>
        <p>{title}</p>

        <h1>YOUR BATCH HERE! :)</h1>

        <h2>Debug Props</h2>
        <pre>{JSON.stringify(this.props, true, 2)}</pre>

        <JoinBatchDialog batchId={batch._id} />
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, batches }, { match }) => {
  const batch = batches.filter((g) => (g._id === match.params.batchId))[0]
  const currentStudent = batch && batch.students.filter((p) => (p.userId === currentUser._id))[0]
  const hasTurn = !!currentStudent && batch.students[batch.turn].userId === currentUser._id
  return {
    currentStudent,
    batch,
    isStudent: !!currentStudent,
    hasTurn,
    isJoinable: batch && !currentStudent && batch.students.length < 2
  }
}

export default connect(mapStateToProps, {
  fetchOneBatch,
  fetchStudents
})(Batch)
