// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchBatches from '../actions/batches/fetch'
import fetchStudents from '../actions/batches/fetch'
import fetchEvaluations from '../actions/evaluations/fetch'
import fetchOneBatch from '../actions/batches/fetch'
import CreateBatchButton from '../components/batches/CreateBatchButton'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import './Lobby.css'

class Lobby extends PureComponent {
  componentWillMount() {
    this.props.fetchBatches()
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
            { this.props.batches.map((batch,index) => <h3 className="box" key={ index } onClick={this.fetchBatch.bind(this, batch._id)} >👥 #{ batch.batchNumber } </h3>) }
          </Menu>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({ batches, currentUser }) => ({ batches, currentUser })

export default connect(mapStateToProps, { fetchBatches, fetchOneBatch, fetchStudents, push })(Lobby)
