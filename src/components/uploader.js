import React from 'react';
import { Panel, Button, FormControl, Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import * as Redux from 'redux'
import { upload } from '../actions/index'

class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.importFile = this.importFile.bind(this);
    }

    importFile() {
      var input = document.querySelector('input[type="file"]')
      var data = new FormData()
      data.append('dataset', input.files[0])
      this.props.dispatch(upload(data))
    }

    render() {
        return (
          <Panel>
            <Col md={3} mdOffset={4}>
              <FormControl id="hidden" type="file" name="dataset"/>
            </Col>
            <Col md={3} className="text-left">
              <Button bsStyle="primary" onClick={this.importFile}>Upload Data</Button>
            </Col>
          </Panel>
        );
    }
}
Uploader = connect()(Uploader)

export default Uploader
