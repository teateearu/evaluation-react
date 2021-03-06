import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import fetchOneBatch from '../actions/batches/fetch'
import {fetchStudents} from '../actions/students/fetch'
// import {fetchStudents} from '../actions/batches/fetch'
import {fetchEvaluations} from '../actions/evaluations/fetch'
import {fetchOneStudent} from '../actions/students/fetch'
import { fetchBatchStudents }from '../actions/students/fetch'
import { push } from 'react-router-redux'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import './Batch.css'
import { randomStudent } from '../actions/students/fetch'

class Batch extends PureComponent {
  static propTypes = {
    fetchStudents: PropTypes.func.isRequired,
    fetchEvaluations: PropTypes.func.isRequired,
    fetchBatchStudents: PropTypes.func.isRequired,
    fetchOneBatch: PropTypes.func.isRequired,
    fetchOneStudent: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { batchId } = this.props.match.params
    this.props.fetchEvaluations()
    this.props.fetchStudents() ///IDK
    this.props.fetchOneBatch(batchId)
    this.props.fetchBatchStudents(batchId)

  }
  // componentDidMount(){}

  batchStudents(){
    const { batchId } = this.props.match.params
    return this.props.students.filter(student => student.batch_id === batchId)
  }

  randomStudent(lastStudentEvaluations){
    this.props.randomStudent(lastStudentEvaluations)
  }

  renderRandomStudentImage(){
    const { randomStudent } = this.props
    const students = this.batchStudents()
    const studentNames = students.map(student => student.name)
    if (studentNames.indexOf(randomStudent.name) === -1) return
    return randomStudent.photo
  }

  renderRandomStudentName(){
    const { randomStudent } = this.props
    const students = this.batchStudents()
    const studentNames = students.map(student => student.name)
    if (studentNames.indexOf(randomStudent.name) === -1) return
    console.log(randomStudent.name)
    return randomStudent.name
  }

  lastStudentEvaluation(studentId){
    var evaluations = []
    evaluations = (this.props.evaluations.filter(evaluation => evaluation.student_id === studentId))
    if(evaluations.length !== 0){return evaluations[0].color} // test if there are evaluations
    else {return 'GREEN'}
  }

  toStudentPage(studentId){
    this.props.push(`/student/${studentId}`)
  }

  render() {
    const { students, batches, randomStudent } = this.props
    const batchId = this.props.match.params
    const lastStudentEvaluations = students.map(student => {return {...student, color: this.lastStudentEvaluation(student._id)}})

    return (
      <div className="Batch">
        <h1>Students of Batch #{ batches.batchNumber }</h1>
        <button className="button button5" onClick= { this.randomStudent.bind(this,lastStudentEvaluations) }>Ask a 'random' student</button>
        <img src={this.renderRandomStudentImage()}/>
        <p>{this.renderRandomStudentName()}</p>
        <Paper className="paper">
          <Menu>
            { students.map((student,index) =>
              <div className='colorbubble' onClick={ this.toStudentPage.bind(this, student._id)} style={ {background: this.lastStudentEvaluation(student._id)}} key={ `div${index}`}>
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

const mapStateToProps = ({ batches, students, evaluations, randomStudent }) => ({ batches, students, evaluations, randomStudent })
export default connect(mapStateToProps, {
  fetchOneBatch,
  fetchStudents,
  fetchEvaluations,
  fetchOneStudent,
  fetchBatchStudents,
  randomStudent,
  push
})(Batch)
