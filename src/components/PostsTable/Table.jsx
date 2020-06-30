import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsTablePage } from "../../store/postsList/actions";
import { Pagination } from "antd";
import { StyledTable } from "./styled";
import moment from "moment";
const PostsTable = () => {
  const dispatch = useDispatch();
  const { current, perPage, pageData, total, pending } = useSelector(
    ({
      postsList: {
        pagination: { current, perPage },
        pageData,
        pending,
        total,
      },
    }) => ({ current, perPage, pageData, total, pending })
  );

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
    },
    {
      title: "Created",
      dataIndex: "created_at",
      key: "created_at",
      render: (data) => moment(data).format("DD-MM-YYYY hh:mm"),
    },
  ];

  console.log(current, perPage, pageData, total, pending);

  useEffect(() => {
    dispatch(getPostsTablePage());
  }, []);

  return (
    <div>
      <StyledTable
        columns={columns}
        dataSource={pageData}
        loading={pending}
        rowKey={(data) => data.title}
        pagination={{ current, total, pageSize: perPage }}
      />
    </div>
  );
};

export default PostsTable;
