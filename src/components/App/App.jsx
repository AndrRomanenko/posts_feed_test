import React from "react";
import { Typography } from "antd";
import PostsTable from "../PostsTable";
import { Container } from "./styled";

const { Title } = Typography;

function App() {
  return (
    <Container>
      <Title>Posts feed</Title>
      <PostsTable />
    </Container>
  );
}

export default App;
