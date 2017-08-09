import ACTIONS from "../constants/actions"

export function upload(data) {
  return { type: ACTIONS.UPLOAD, data: data }
}

export function filter(params) {
  return {
    type: ACTIONS.FILTER_DATASET,
    e: params.e,
    filters: params.filters
  }
}

export function clearFilters() {
  return { type: ACTIONS.CLEAR_FILTERS }
}
