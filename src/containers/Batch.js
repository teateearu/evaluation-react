import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import fetchOneBatch from '../actions/batches/fetch'
import fetchStudents from '../actions/students/fetch'
import fetchEvaluations from '../actions/evaluations/fetch'

class Batch extends PureComponent {
  static propTypes = {
    fetchOneBatch: PropTypes.func.isRequired,
  }

  componentWillMount() {
    // const { pathname } = this.props.router.location
    // const id = pathname.slice(1)
    const { batchId } = this.props.match.params
    this.props.fetchOneBatch('/:id')
    this.props.fetchStudents()
    this.props.fetchEvaluations()
  }

  batchStudents(){
    const { batchId } = this.props.match.params
    return this.props.students.filter(student => student.batch_id === batchId)
  }

  lastStudentEvaluation(studentId){
    var evaluations = []
    evaluations = (this.props.evaluations.filter(evaluation => evaluation.student_id === studentId))
    return evaluations[0].color
  }

  render() {
    const students = this.batchStudents()
    return (
      <div className="Batch">
        // <h1>Batch!</h1>

        <h1>Batch #{this.props.batches.batchNumber}</h1>
        { students.map((student,index) => <div style={{background: this.lastStudentEvaluation(student._id)}} key={ `div${index}`}><img key={`img${index}`} src={ student.photo } alt='student'/> <p key={ index }>{ student.name } </p> </div> )}
        //
        // <h2>Debug Props</h2>
        // <pre>{JSON.stringify(this.props, true, 2)}</pre>

      </div>
    )
  }
}

const mapStateToProps = ({ batches, students, evaluations }) => ({ batches, students, evaluations })
export default connect(mapStateToProps, { fetchOneBatch, fetchStudents, fetchEvaluations })(Batch)
