import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes";
import { ProjectRoutes } from "./routes/ProjectRoutes";
import { LanguagePairRoutes } from "./routes/LanguagePairRoutes";
import { ROUTES } from "./routes/paths";
import { NavBar } from "./components/NavBar/NavBar";
import { Login } from "./components/Login/Login";
import { NotFound } from "./components/NotFound/NoutFound";
import { Footer } from "./components/Footer/Footer";

const App = () => (
  <BrowserRouter>
    <NavBar />
    <Routes>
      {/* Rutas sin layout */}
      <Route path={ROUTES.LOGIN} element={<Login />} />
      {/* Rutas con layout */}
      <Route
        path="/*"
        element={
          <Routes>
            {UserRoutes()}
            {ProjectRoutes()}
            {LanguagePairRoutes()}
            <Route path="*" element={<NotFound />} />
          </Routes>
        }
      />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
