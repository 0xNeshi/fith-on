import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { lazy, Suspense, useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import theme from "./config/theme";
import { RequireAnon, RequireAuth } from "./guards";
import {
  ModalProvider,
  UserContext,
  UserProvider,
  NetworkStateProvider,
} from "./providers";

const Dashboard = lazy(() => import("./components/Dashboard"));
const SignIn = lazy(() => import("./components/SignIn"));

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <ModalProvider>
          <NetworkStateProvider>
            <Container component="main" sx={{ padding: 0 }}>
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
                    <Route exact path="/" element={<Content />} />
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

function Content() {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    return (
      <div style={{ height: "100vh" }}>
        <Loading />
      </div>
    );
  }

  const targetUrl = !!user ? "/dashboard" : "/signin";

  return <Navigate to={targetUrl} />;
}
