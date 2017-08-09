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
  componentWillReceiveProps(nextProps){

    var filter = ''

    if (nextProps.filters.date !== this.props.filters.date) {
      filter = 'date'
    } else {
      filter = 'state'
    }

    var select = document.getElementsByName(`select_${filter}`)[0]
    select.value = nextProps.filters[filter]

    // simulating an event structure
    var event = {
      target: {
        name: select.name,
        value: nextProps.filters[filter]
      }
    }

    this.filterDataset(event)
  }

  mapFilterDates() {
    var dataset = this.props.dataset;

    if (dataset.length > 0) {
      return dataset.filter((elem, i, a) =>
          i === a.findIndex(elem2 => elem.date === elem2.date)
      ).map((elem) => elem.date)
    } else{
      return []
    }
  }

  filterDataset(e){
    var { dataset: filtered, filters }  = this.props

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
    return this.props.clearFilters()
  }

  render() {
    return <Panel>
      <Col md={3} mdOffset={2}>
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
      <Col md={1}>
        <Button bsStyle="danger" onClick={this.clearFilters}>Clear Filters</Button>
      </Col>
    </Panel>;
  }
}
