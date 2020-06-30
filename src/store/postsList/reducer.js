import { composeReducer } from "redux-compose-reducer";
import { TYPES } from "./actions";

const initialState = {
  pageData: [],
  pagination: {
    current: 1,
    perPage: 20,
  },
  total: 0,
  pending: false,
};

const setTablePageData = (state, { payload }) => {
  return {
    ...state,
    pageData: payload.hits || state.pageData,
    total: payload.hits ? state.total + payload.hits.length : state.total,
    pending: payload.pending,
  };
};

const addTableData = (state, { payload }) => {
  return {
    ...state,
    pageData: payload.hits
      ? state.pageData.concat(payload.hits)
      : state.pageData,
    total: payload.hits ? state.total + payload.hits.length : state.total,
    pending: payload.pending,
  };
};

const setPagination = (state, { payload }) => {
  return {
    ...state,
    pagination: {
      current: payload.page || state.pagination.current,
      perPage: payload.hitsPerPage || state.pagination.perPage,
    },
  };
};

export default composeReducer({
  types: TYPES,
  initialState,
  reducers: {
    setTablePageData,
    setPagination,
    addTableData,
  },
});
