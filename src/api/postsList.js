import axios from "axios";

export const getTablePage = ({ pagination }) => {
  const requestParams = {
    tags: "story",
    page: pagination.current,
  };

  Object.keys(requestParams).forEach(
    (key) => !requestParams[key] && delete requestParams[key]
  );
  return axios.get("https://hn.algolia.com/api/v1/search_by_date", {
    params: requestParams,
  });
};
