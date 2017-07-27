import React from 'react';
import { Panel, Button, FormControl, Col } from 'react-bootstrap';
import axios from 'axios'

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.importFile = this.importFile.bind(this);
        this.changeFile = this.changeFile.bind(this);
    }

    changeFile(e) {
      this.setState({dataset: e.target.files[0]});
    }

    importFile() {
      var input = document.querySelector('input[type="file"]')
      var data = new FormData()
      data.append('dataset', input.files[0])

      axios.post('/upload', data)
      .then((response) => {
        this.props.onUpload();
      })
      .catch((error) => {
        alert('Could not upload file. Is it a valid .csv file?');
        console.log(error);
      });
    }

    render() {
        return (
          <Panel>
            <Col md={3} mdOffset={3}>
              <FormControl id="hidden" onChange={this.changeFile} type="file" name="dataset"/>
            </Col>
            <Col md={4} className="text-left">
              <Button bsStyle="primary" onClick={this.importFile}>Upload Data</Button>
            </Col>
          </Panel>
        );
    }
}
