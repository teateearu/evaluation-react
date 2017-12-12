// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchBatches, { fetchStudents } from '../actions/batches/fetch'
import CreateBatchButton from '../components/batches/CreateBatchButton'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import './Lobby.css'

class Lobby extends PureComponent {
  componentWillMount() {
    this.props.fetchBatches()
  }
  render() {
    return (
      <div className="Lobby">
        <h1>Lobby!</h1>
        <CreateBatchButton />
        <Paper className="paper">
          <Menu>
            { this.props.batches.map((batch,index) => <h3 key={ index } > Batch #{ batch.batchNumber } </h3>) }
          </Menu>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({ batches, currentUser }) => ({ batches, currentUser })

export default connect(mapStateToProps, { fetchBatches, fetchStudents, push })(Lobby)
