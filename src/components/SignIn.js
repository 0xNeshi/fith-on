import { Fade } from "@mui/material";
import Button from "@mui/material/Button";
import { blue } from "@mui/material/colors";
import { useContext } from "react";
import styled from "styled-components";
import Google from "../assets/images/google.png";
import { UserContext } from "../providers";
import { signInWithGoogle } from "../services/authService";

export default function SignIn() {
  const { error } = useContext(UserContext);

  return (
    <Container>
      <Fade in>
        <div>
          <h3 style={{ textAlign: "center" }}>Let's get started...</h3>
          <Button
            variant="contained"
            onClick={signInWithGoogle}
            sx={{ backgroundColor: blue[800], paddingLeft: 1 }}
          >
            <ButtonIcon src={Google} alt="" />
            Connect with Google
          </Button>
          {error && <Error>{error}</Error>}
        </div>
      </Fade>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Error = styled.span`
  color: red;
  width: 100%;
  text-align: center;
`;

const ButtonIcon = styled.img`
  padding: 10px;
  width: 50px;
  height: 100%;
  margin-right: 15px;
  background-color: white;
  border-radius: 3px;
`;
