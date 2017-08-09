import React from "react";

export default class Table extends React.Component {
  mapRows() {
        var dataset = this.props.dataset;
        return dataset.length > 0 ?
        dataset.map((line) =>
          <tr>
            <td>{line.date}</td>
            <td>{line.state.toUpperCase()}</td>
            <td>{line.metric}</td>
            <td>{line.value}</td>
          </tr>
        ) : <tr>
            <td className="text-center" colSpan="5" > No Data Loaded </td>
            </tr>;
    }
    render() {

        return <table className="table striped bordered condensed hover">
          <thead>
            <tr>
              <th>Date</th>
              <th>State</th>
              <th>Metric</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {this.mapRows()}
          </tbody>
        </table>;
    }
}
