import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchOneStudent from '../actions/students/fetch'


class Student extends PureComponent {
  componentWillMount(){
    const { studentId } = this.props.match.params
    fetchOneStudent(studentId)
  }

  render() {
    return (
      <div className="Student">
       <h1>Student</h1>
      </div>
    )
  }
}

const mapStateToProps = ({ batches, students }) => ({ batches, students })

export default connect(mapStateToProps, { fetchOneStudent, push })(Student)
