import React from "react";
import { FormControl, Panel, Col, Button } from 'react-bootstrap';

export default class Filter extends React.Component {

  constructor(props) {
    super(props);
    this.mapFilterDates = this.mapFilterDates.bind(this);
    this.mapFilterStates = this.mapFilterStates.bind(this);
    this.filterDataset = this.filterDataset.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
  }

  mapFilterStates() {
    var dataset = this.props.dataset;

    if (dataset.length > 0) {
      return dataset.filter((elem, i, a) =>
        i === a.findIndex(elem2 => elem.state === elem2.state)
      ).map((elem) => elem.state);
    }else{
      return []
    }
  }

  mapFilterDates() {
    var dataset = this.props.dataset;

    if (dataset.length > 0) {
    return dataset.filter((elem, i, a) =>
        i === a.findIndex(elem2 => elem.date === elem2.date)
      ).map((elem) => elem.date)
    }else{
      return []
    }
  }

  filterDataset(e){
    var filtered = this.props.dataset
    var filters = this.props.filters

    if (filters.date === '' && filters.state === '' && e.target.value === '') {
      return this.props.onFilter(filtered, filters)
    }

    var filterName = e.target.name.substring(7)

    filters[filterName] = e.target.value.toLowerCase()

    if (filters.date !== '') {
      filtered =  filtered.filter((elem) => elem.date === filters.date);
    }

    if (filters.state !== '') {
      filtered =  filtered.filter((elem) => elem.state === filters.state);
    }

    return this.props.onFilter(filtered, filters)
  }

  clearFilters() {
    var selects = document.getElementsByTagName('select')
    selects[0].selectedIndex = 0;
    selects[1].selectedIndex = 0;
    var filters = {
      date: '',
      state: ''
    }
    return this.props.onFilter(this.props.dataset, filters)
  }

  render() {
    return <Panel>
      <Col md={3} mdOffset={3}>
        <FormControl onChange={this.filterDataset} componentClass="select"
                     placeholder="Select Date" name="select_date">
          <option value="">Select Date</option>
          {this.mapFilterDates().map((date) =>
            <option value={date}>{date}</option>
          )}
        </FormControl>
      </Col>
      <Col md={3}>
        <FormControl onChange={this.filterDataset} componentClass="select"
                     placeholder="Select State" name="select_state">
          <option value="">Select State</option>
          {this.mapFilterStates().map((state) =>
            <option value={state}>{state.toUpperCase()}</option>
          )}
        </FormControl>
      </Col>
      <Col md={3}>
        <Button bsStyle="danger" onClick={this.clearFilters}>Clear Filters</Button>
      </Col>
    </Panel>;
  }
}
