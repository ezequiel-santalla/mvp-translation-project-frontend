import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./components/context/AuthContext";
import { UserRoutes } from "./routes/UserRoutes";
import { ProjectRoutes } from "./routes/ProjectRoutes";
import { LanguagePairRoutes } from "./routes/LanguagePairRoutes";
import { ROUTES } from "./routes/paths";
import { NavBar } from "./components/NavBar/NavBar";
import { Login } from "./components/Login/Login";
import { ForgotPassword } from "./components/Login/ForgotPassword"; 
import { VerifyToken } from "./components/Login/VerifyToken";
import { NotFound } from "./components/NotFound/NoutFound";
import { Footer } from "./components/Footer/Footer";

const AppContent = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      {!isAuthenticated && (
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
            </>
          ) : (
            <>
              {UserRoutes()}
              {ProjectRoutes()}
              {LanguagePairRoutes()}
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
