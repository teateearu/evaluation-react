// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchBatchs, { fetchStudents } from '../actions/batches/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import CreateBatchButton from '../components/batches/CreateBatchButton'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import WatchBatchIcon from 'material-ui/svg-icons/image/remove-red-eye'
import JoinBatchIcon from 'material-ui/svg-icons/social/person-add'
import PlayBatchIcon from 'material-ui/svg-icons/hardware/videobatch-asset'
import WaitingIcon from 'material-ui/svg-icons/image/timelapse'
import './Lobby.css'

class Lobby extends PureComponent {
  componentWillMount() {
    this.props.fetchBatchs()
    this.props.subscribeToWebsocket()
  }

  goToBatch = batchId => event => this.props.push(`/play/${batchId}`)

  isJoinable(batch) {
    return batch.students.length < 2 &&
      !this.isStudent(batch)
  }

  isStudent(batch) {
    if (!this.props.currentUser) { return false }
    return batch.students.map(p => p.userId)
      .indexOf(this.props.currentUser._id) >= 0
  }

  isPlayable(batch) {
    return this.isStudent(batch) && batch.students.length === 2
  }

  renderBatch = (batch, index) => {
    let ActionIcon = this.isJoinable(batch) ? JoinBatchIcon : WatchBatchIcon
    if (this.isStudent(batch)) ActionIcon = this.isPlayable(batch) ? PlayBatchIcon : WaitingIcon

    if (!batch.students[0].name) { this.props.fetchStudents(batch) }

    const title = batch.students.map(p => (p.name || null))
      .filter(n => !!n)
      .join(' vs ')

    return (
      <MenuItem
        key={index}
        onClick={this.goToBatch(batch._id)}
        rightIcon={<ActionIcon />}
        primaryText={title} />
    )
  }

  render() {
    return (
      <div className="Lobby">
        <h1>Lobby!</h1>
        <CreateBatchButton />
        <Paper className="paper">
          <Menu>
            {this.props.batches.map(this.renderBatch)}
          </Menu>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({ batches, currentUser }) => ({ batches, currentUser })

export default connect(mapStateToProps, { fetchBatchs, subscribeToWebsocket, fetchStudents, push })(Lobby)
