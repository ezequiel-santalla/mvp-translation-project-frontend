import { Routes, Route, Navigate, useLocation  } from "react-router-dom";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./components/context/AuthContext";
import { UserRoutes } from "./routes/UserRoutes";
import { ProjectRoutes } from "./routes/ProjectRoutes";
import { LoginRoutes } from "./routes/LoginRoutes";
import { LanguagePairRoutes } from "./routes/LanguagePairRoutes";
import { ROUTES } from "./routes/paths";
import { NavBar } from "./components/NavBar/NavBar";
import { Login } from "./components/Login/Login";
import { ForgotPassword } from "./components/Login/ForgotPassword"; 
import { VerifyToken } from "./components/Login/VerifyToken";
import { NotFound } from "./components/NotFound/NoutFound";
import { Footer } from "./components/Footer/Footer";
import { EnterToken } from "./components/Login/EnterToken";
import { ResetPassword } from "./components/Login/ResetPassword";
import { GenerateAuthCode } from "./components/Login/GenerateAuthCode";

const AppContent = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  const allowedPaths = ["/forgot-password","/verify-token", "/enter-token", "/reset-password"]; // Rutas donde el Login NO debe cubrir la pantalla

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      {!isAuthenticated && !allowedPaths.includes(location.pathname) && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
          <Login />
        </div>
      )}

      <main className="flex-grow">
        <Routes>
          {!isAuthenticated ? (
            <>
                    <Route path="/forgot-password" element={<ForgotPassword />} />              
                    <Route path="/verify-token" element={<VerifyToken />} />              
                    <Route path="/enter-token" element={<EnterToken />} />              
                    <Route path="/reset-password" element={<ResetPassword />} />              

            {LoginRoutes()}
              
            </>
          ) : (
            <>
        {UserRoutes()}
              {ProjectRoutes()}
              {LanguagePairRoutes()}
              <Route path="/generate-pre-register-code" element={<GenerateAuthCode />} />              

              <Route path="*" element={<NotFound />} />
            </>
          )}
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
