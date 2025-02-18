import { Route } from "react-router-dom";
import { ROUTES } from "./paths";
import { ProjectList } from "../components/Project/ProjectList";
import { ProjectRegister } from "../components/Project/ProjectRegister";

export const ProjectRoutes = () => (
  <>
    <Route path={ROUTES.PROJECTS} element={<ProjectList />} />
    <Route path={ROUTES.PROJECT_REGISTER} element={<ProjectRegister />} />
  </>
);

