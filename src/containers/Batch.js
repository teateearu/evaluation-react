import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import fetchOneBatch from '../actions/batches/fetch'
import fetchStudents from '../actions/students/fetch'
import fetchEvaluations from '../actions/evaluations/fetch'
import fetchOneStudent from '../actions/students/fetch'
import fetchBatchStudents from '../actions/students/fetch'
import { push } from 'react-router-redux'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import './Batch.css'

class Batch extends PureComponent {
  static propTypes = {
    // fetchOneBatch: PropTypes.func.isRequired,
    fetchStudents: PropTypes.func.isRequired,
    fetchEvaluations: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { batchId } = this.props.match.params
    this.props.fetchOneBatch(batchId)
    this.props.fetchBatchStudents(batchId)
    this.props.fetchEvaluations()
  }
  // componentDidMount(){}

  // batchStudents(){
  //   const { batchId } = this.props.match.params
  //   return this.props.students.filter(student => student.batch_id === batchId)
  // }

  lastStudentEvaluation(studentId){
    var evaluations = []
    evaluations = (this.props.evaluations.filter(evaluation => evaluation.student_id === studentId))
    if(evaluations.length !== 0){return evaluations[0].color}
    else {return 'green'}
  }

  toStudentPage(studentId){
    this.props.push(`/student/${studentId}`)
  }

  render() {
    const { students, batches } = this.props
    const batchId = this.props.match.params
    const lastStudentEvaluations = students.map(student => {return {...student, color: this.lastStudentEvaluation(student._id)}})
    return (
      <div className="Batch">
        <h1>Students:{ batches.batchNumber }</h1>
        <Paper className="paper">
          <Menu>
            { students.map((student,index) =>
              <div onClick={ this.toStudentPage.bind(this, student._id)} key={ `div${index}`}>
                <h4 key={ index }>{ student.name }: </h4>
                <img key={`img${index}`} src={ student.photo } alt='student'/>
              </div>
            )}
          </Menu>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({ batches, students, evaluations }) => ({ batches, students, evaluations })
export default connect(mapStateToProps, {
  fetchOneBatch,
  fetchStudents,
  fetchEvaluations,
  fetchOneStudent,
  fetchBatchStudents,
  push
})(Batch)
