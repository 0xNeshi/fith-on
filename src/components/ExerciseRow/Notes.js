import { styled } from "@mui/material";
import React from "react";

export default function Notes({ isVisible }) {
  if (!isVisible) {
    return null;
  }

  return <Container colSpan={6}>some content</Container>;
}

const Container = styled("td")`
  width: 100%;
  background-color: grey;
`;
