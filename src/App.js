import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import Loading from "./components/Loading";
import theme from "./config/theme";
import { RequireAnon, RequireAuth } from "./guards";
import { ModalProvider, NetworkStateProvider, UserProvider } from "./providers";

const Dashboard = lazy(() => import("./components/Dashboard"));
const SignIn = lazy(() => import("./components/SignIn"));

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <ModalProvider>
          <NetworkStateProvider>
            <Container
              component="main"
              maxWidth="sm"
              sx={{ padding: 0, backgroundColor: "background.paper" }}
            >
              <CssBaseline />
              <Suspense fallback={<Loading />}>
                <BrowserRouter>
                  <Routes>
                    <Route
                      exact
                      path="/signin"
                      element={
                        <RequireAnon>
                          <SignIn />
                        </RequireAnon>
                      }
                    />
                    <Route
                      exact
                      path="/dashboard"
                      element={
                        <RequireAuth>
                          <Dashboard />
                        </RequireAuth>
                      }
                    />
                    <Route exact path="/" element={<Landing />} />
                  </Routes>
                </BrowserRouter>
              </Suspense>
            </Container>
          </NetworkStateProvider>
        </ModalProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
