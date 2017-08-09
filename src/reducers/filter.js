import ACTIONS from "../constants/actions"

export const filter = (state, action) => {
  switch (action.type) {
    case ACTIONS.FILTER_DATASET:
      var { dataset: filtered }  = state

      var filterName = action.e.target.name.substring(7)

      action.filters[filterName] = action.e.target.value.toLowerCase()

      if (action.filters.date !== '') {
        filtered =  filtered.filter((elem) => elem.date === action.filters.date);
      }

      if (action.filters.state !== '') {
        filtered =  filtered.filter((elem) => elem.state === action.filters.state);
      }

      return state.merge({
        datasetFiltered: filtered,
        filters: action.filters
      })
      break;
    case ACTIONS.CLEAR_FILTERS:
      return state.merge({
        datasetFiltered: state.dataset,
        filters: {
          date: '',
          state: ''
        }
      })
    default:
      return state
  }
}
