import { createTypes } from "redux-compose-reducer";
import { getTablePage } from "../../api/postsList";
import { notification } from "antd";

export const TYPES = createTypes("postsList", [
  "setTablePageData",
  "addTableData",
  "setPagination",
]);

export const getPostsTablePage = () => async (dispatch, getState) => {
  dispatch({ type: TYPES.setTablePageData, payload: { pending: true } });
  try {
    const {
      postsList: { pagination },
    } = getState();

    const { hits, nbHits, page, hitsPerPage } = (
      await getTablePage({ pagination })
    ).data;

    dispatch({
      type: TYPES.setTablePageData,
      payload: { hits, nbHits, pending: false },
    });
    dispatch({
      type: TYPES.setPagination,
      payload: { page, hitsPerPage },
    });
  } catch (err) {
    notification({ message: "Error fetching table data!" });
    dispatch({
      type: TYPES.setTablePageData,
      payload: { pending: false },
    });
  }
};

export const refreshTableData = () => async (dispatch, getState) => {
  dispatch({ type: TYPES.setTablePageData, payload: { pending: true } });
  try {
    const {
      postsList: { pagination },
    } = getState();

    const newPage = pagination.current + 1;

    dispatch({
      type: TYPES.setPagination,
      payload: { page: newPage },
    });

    const { hits, nbHits } = (
      await getTablePage({ pagination: { current: newPage } })
    ).data;

    dispatch({
      type: TYPES.addTableData,
      payload: { hits, nbHits, pending: false },
    });
  } catch (err) {
    console.log(err);
  } finally {
    dispatch({
      type: TYPES.setTablePageData,
      payload: { pending: false },
    });
  }
};

export const setPagination = (page, hitsPerPage) => (dispatch) => {
  dispatch({
    type: TYPES.setPagination,
    payload: { page, hitsPerPage },
  });
};
