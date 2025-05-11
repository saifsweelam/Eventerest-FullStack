import { BrowserRouter, Route, Routes } from "react-router";
import AuthLayout from "./pages/auth/layout";
import AuthProvider from "./providers/authProvider";
import LoginPage from "./pages/auth/login/page";
import RegisterPage from "./pages/auth/register/page";
import RootLayout from "./pages/layout";
import DefaultLayout from "./pages/default/layout";
import LandingPage from "./pages/default/landing/page";

function App() {
    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <RootLayout>
                        <Routes>
                            <Route element={<DefaultLayout />}>
                                <Route index element={<LandingPage />} />
                            </Route>

                            <Route element={<AuthLayout />}>
                                <Route path="login" element={<LoginPage />} />
                                <Route
                                    path="register"
                                    element={<RegisterPage />}
                                />
                            </Route>
                        </Routes>
                    </RootLayout>
                </AuthProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
