import React from "react";
import { Box, styled } from "@mui/material";

export default function Loading() {
  return <Container>Loading...</Container>;
}

const Container = styled(Box)`
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
