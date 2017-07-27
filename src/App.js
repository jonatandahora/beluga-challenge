import React, { Component } from 'react';
import Uploader from './components/uploader'
import Table from './components/table'
import Filter from './components/filter'
import Chart from './components/chart'
import {Tabs, Tab, Grid, Row, Col} from 'react-bootstrap'
var io = require('socket.io-client')
const socket = io();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.onFilter = this.onFilter.bind(this);
    this.state = {
      dataset: [],
      datasetFiltered: [],
      filters: {
        date: '',
        state: ''
      }
    }
  }
  componentDidMount() {
    this.handleScoket();
  }

  onUpload() {
    socket.emit('dataset:load', {});
  }

  onFilter(datasetFiltered, filters) {
    this.setState({
      datasetFiltered: datasetFiltered,
      filters: filters
    });
    socket.emit('filters:changed', filters);
  }

  handleScoket() {
    socket.emit('dataset:load', {});
    socket.on('dataset:loaded', (dataset) => {
      this.setState({
        dataset: dataset,
        datasetFiltered: dataset,
      });
    });
    socket.on('filters:updated', (filters) => {
      // this should trigger a render with updated filters in all tabs and browsers
      // but does not seen to work
      // the socket does emit the updated filter to all clients though
      this.setState({filters});
    });
  }

  render() {
    return <Grid>
      <Row bsClass="text-center">
        <Col md={12}>
          <Uploader socket={socket} onUpload={this.onUpload}/>
        </Col>
      </Row>
      <Row bsClass="text-center">
        <Col md={12}>
          <Filter filters={this.state.filters} datasetFiltered={this.state.datasetFiltered}
                  dataset={this.state.dataset}
                  onFilter={this.onFilter}/>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Tabs defaultActiveKey={1} id="tabs">
            <Tab eventKey={1} title="Table">
              <Table dataset={this.state.datasetFiltered}/>
            </Tab>
            <Tab eventKey={2} title="Chart">
              <Chart dataset={this.state.dataset}
                     datasetFiltered={this.state.datasetFiltered}/>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Grid>
  }
}
