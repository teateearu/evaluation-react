import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchOneStudent from '../actions/students/fetch'
import fetchEvaluations from '../actions/evaluations/fetch'

class Student extends PureComponent {
  componentWillMount(){
    if (this.props.students.length === 0) return this.props.push('/')
    this.props.fetchEvaluations()
  }

  render() {
    const { students, evaluations } = this.props
    const studentEvaluations = evaluations.filter(evaluation => evaluation.student_id === students._id)
    return (
      <div className="Student">
       <h1>{ students.name }</h1>
       <img src={ students.photo } />
       { evaluations.color}
      </div>
    )
  }
}

const mapStateToProps = ({ batches, students, evaluations }) => ({ batches, students, evaluations })

export default connect(mapStateToProps, { fetchOneStudent, fetchEvaluations, push })(Student)
