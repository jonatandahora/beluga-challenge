import React from 'react';
import ReactHighcharts from 'react-highcharts';
var _groupBy = require('lodash.groupby');
var _chunk = require('lodash.chunk');

export default class Chart extends React.Component {
    render() {
      var filtered = this.props.datasetFiltered
      var grouped = _groupBy(filtered, 'state')
      var radix = 10

      var reduced = Object.keys(grouped).map((key) => {
        return _chunk(grouped[key], 2).map((item) => {
          return parseInt(item[0]['value'], radix) + parseInt(item[1]['value'], radix)
        })
      });

      var categories = filtered.filter((elem, i, a) =>
        i === a.findIndex(elem2 => elem.date === elem2.date)
      ).map((elem) => elem.date)

      var config = {
        title: {text: "Finances per state"},
        xAxis: { categories: categories },
        series: [{ name: "SP", data: reduced[0] }, { name: "RJ", data: reduced[1] }]
      };

      return <ReactHighcharts config={config} ref="chart"></ReactHighcharts>;
    }
}
