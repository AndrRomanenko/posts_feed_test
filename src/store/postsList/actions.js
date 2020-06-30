import { createTypes } from "redux-compose-reducer";
import { getTablePage } from "../../api/postsList";
import { notification } from "antd";

export const TYPES = createTypes("postsList", [
  "setTablePageData",
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

export const setPagination = (page, hitsPerPage) => (dispatch) => {
  dispatch({
    type: TYPES.setPagination,
    payload: { page, hitsPerPage },
  });
};
