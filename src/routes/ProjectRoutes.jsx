import { Route } from "react-router-dom";
import { ROUTES } from "./paths";
import { ProjectList } from "../components/Project/ProjectList";
import { ProjectRegister } from "../components/Project/ProjectRegister";
import { ProjectUpdate } from "../components/Project/ProjectUpdate";

export const ProjectRoutes = () => (
  <>
    <Route path={ROUTES.PROJECTS} element={<ProjectList />} />
    <Route path={ROUTES.PROJECT_REGISTER} element={<ProjectRegister />} />
    <Route path={ROUTES.PROJECT_UPDATE} element={<ProjectUpdate />} />
  </>
);

