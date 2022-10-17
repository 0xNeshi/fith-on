import { Container } from "@mui/material";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import Loading from "./components/Loading";
import { RequireAnon, RequireAuth } from "./guards";
import {
  ModalProvider,
  ModeProvider,
  NetworkStateProvider,
  UserProvider,
  SectionsProvider,
} from "./providers";

const Dashboard = lazy(() => import("./components/Dashboard"));
const SignIn = lazy(() => import("./components/SignIn"));

export default function App() {
  return (
    <NetworkStateProvider>
      <UserProvider>
        <ModeProvider>
          <ModalProvider>
            <SectionsProvider>
              <Container
                component="main"
                maxWidth="sm"
                sx={{ padding: 0, backgroundColor: "background.paper" }}
              >
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
            </SectionsProvider>
          </ModalProvider>
        </ModeProvider>
      </UserProvider>
    </NetworkStateProvider>
  );
}
