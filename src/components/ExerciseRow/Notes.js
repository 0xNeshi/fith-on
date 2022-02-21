import { styled } from "@mui/material";
import React from "react";

export default function Notes({ isVisible }) {
  if (!isVisible) {
    return null;
  }

  return (
    <Container>
      <td colSpan={6}>some content</td>
    </Container>
  );
}

const Container = styled("tr")`
  width: 100%;
  background-color: grey;
`;
