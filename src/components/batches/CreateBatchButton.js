// src/components/batches/CreateBatchButton.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import StarIcon from 'material-ui-icons/SentimentSatisfied.js'
import createBatch from '../../actions/batches/create'

class CreateBatchButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  alert(){
    window.alert();
  }

  render() {
    if (!this.props.signedIn) return null

    return (
      <div className="CreateBatchButton">
        <RaisedButton
        label=""
        primary={true}
        onClick={() => alert("This button does nothing :)")}
        icon={<StarIcon />} />
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { createBatch })(CreateBatchButton)
