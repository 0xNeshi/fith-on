import { Box, Fade, styled, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Google from "../assets/images/google.png";
import { signInWithGoogle } from "../services/authService";

export default function SignIn() {
  return (
    <Container>
      <Fade in>
        <Box>
          <Header variant="h6" component="div">
            Let's get started...
          </Header>
          <Button
            variant="contained"
            onClick={signInWithGoogle}
            color="primary"
            sx={{ paddingLeft: 1 }}
          >
            <ButtonIcon src={Google} alt="" />
            Connect with Google
          </Button>
        </Box>
      </Fade>
    </Container>
  );
}

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Header = styled(Typography)`
  text-align: center;
  margin-bottom: 15px;
`;

const ButtonIcon = styled("img")`
  padding: 10px;
  width: 50px;
  height: 100%;
  margin-right: 15px;
  background-color: white;
  border-radius: 3px;
`;
