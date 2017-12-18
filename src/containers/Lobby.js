// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchBatches from '../actions/batches/fetch'
import fetchStudents from '../actions/batches/fetch'
import {fetchEvaluations} from '../actions/evaluations/fetch'
import {fetchOneBatch} from '../actions/batches/fetch'
import CreateBatchButton from '../components/batches/CreateBatchButton'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import './Lobby.css'

class Lobby extends PureComponent {
  componentWillMount() {
    this.props.fetchBatches()
    this.props.fetchStudents()
    this.props.fetchEvaluations()
  }
  fetchBatch(id){
    this.props.push(`/batch/${id}`)
    this.props.fetchOneBatch(id)
  }
  render() {
    return (
      <div className="Lobby">
        <h1>Batches</h1>
        <CreateBatchButton />
        <Paper className="paper">
          <Menu>
            { this.props.batches.map((batch,index) => <h3 className="box" key={ index } onClick={this.fetchBatch.bind(this, batch._id)} >👥 #{ batch.batchNumber } <p className="dates">Runs from {batch.startDate.substring(5, 10)} til {batch.endDate.substring(5, 10)}</p></h3>) }
          </Menu>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({ batches, currentUser }) => ({ batches, currentUser })

export default connect(mapStateToProps, { fetchBatches, fetchOneBatch, fetchStudents, fetchEvaluations, push })(Lobby)
