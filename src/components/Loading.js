import React from "react";
import styled from "styled-components";

export default function Loading() {
  return <Container>Loading...</Container>;
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
