import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchOneStudent from '../actions/students/fetch'
import fetchEvaluations from '../actions/evaluations/fetch'

class Student extends PureComponent {
  componentWillMount(){
    const { studentId } = this.props.match.params
    fetchOneStudent(studentId)
    this.props.fetchOneStudent(studentId)
    this.props.fetchEvaluations()
  }

  render() {
    const { students, evaluations } = this.props
    const studentEvaluations = evaluations.filter(evaluation => evaluation.student_id === students._id)
    return (
      <div className="Student">
       <h1>{ students.name }</h1>
       <img src={ students.photo } />
       { studentEvaluations.map(evaluation => div style={ { background: evaluation.color }}/>)}
      </div>
    )
  }
}

const mapStateToProps = ({ batches, students, evaluations }) => ({ batches, students, evaluations })

export default connect(mapStateToProps, { fetchOneStudent, fetchEvaluations, push })(Student)
