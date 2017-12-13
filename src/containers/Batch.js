import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import fetchOneBatch from '../actions/batches/fetch'
import fetchStudents from '../actions/students/fetch'
import fetchEvaluations from '../actions/evaluations/fetch'
import fetchOneStudent from '../actions/students/fetch'
import { push } from 'react-router-redux'

class Batch extends PureComponent {
  static propTypes = {
    fetchOneBatch: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const { batchId } = this.props.match.params
    this.props.fetchOneBatch(batchId)
    this.props.fetchStudents()
    this.props.fetchEvaluations()
  }
  // componentDidMount(){}

  batchStudents(){
    const { batchId } = this.props.match.params
    return this.props.students.filter(student => student.batch_id === batchId)
  }

  lastStudentEvaluation(studentId){
    var evaluations = []
    evaluations = (this.props.evaluations.filter(evaluation => evaluation.student_id === studentId))
    return evaluations[0].color
  }

  toStudentPage(studentId){
    const { batchId } = this.props.match.params
    this.props.push(`/student/${studentId}`)
  }

  render() {
    const students = this.batchStudents()
    const lastStudentEvaluations = students.map(student => {return {...student, color: this.lastStudentEvaluation(student._id)}})
    return (
      <div className="Batch">
        <h1>Batch #{this.props.batches.batchNumber}</h1>
        { students.map((student,index) => <div onClick={ this.toStudentPage.bind(this, student._id)} style={ {background: this.lastStudentEvaluation(student._id)}} key={ `div${index}`}><img key={`img${index}`} src={ student.imageUrl } alt='student'/> <p key={ index }>{ student.name } </p> </div> )}
      </div>
    )
  }
}

const mapStateToProps = ({ batches, students, evaluations }) => ({ batches, students, evaluations })
export default connect(mapStateToProps, { fetchOneBatch, fetchStudents, fetchEvaluations, fetchOneStudent, push })(Batch)
