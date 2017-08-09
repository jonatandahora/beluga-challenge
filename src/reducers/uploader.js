import axios from 'axios'
import ACTIONS from "../constants/actions"

var initialState = {
  dataset: [],
  datasetFiltered: [],
  filters: {
    date: '',
    state: ''
  }
}
export const uploader = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.UPLOAD:

      axios.post('/upload', action.data)
      .then((response) => {
        return state.merge({
          dataset: response,
          datasetFiltered: response
        })
      })
      .catch((error) => {
        alert('Could not upload file. Is it a valid .csv file?');
        console.log(error);
      });
      break;
    default:
      return state
  }
}
