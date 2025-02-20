import { Route } from "react-router-dom";
import { ROUTES } from "./paths";
import { UserList } from "../components/User/UserList";
import { UserRegister } from "../components/User/UserRegister";
import { UserUpdate } from "../components/User/UserUpdate";
import { ProjectList } from "../components/Project/ProjectList";

export const UserRoutes = () => (
  <>
    <Route path={ROUTES.USERS} element={<UserList />} />
    <Route path={ROUTES.USER_REGISTER} element={<UserRegister />} />
    <Route path={ROUTES.USER_UPDATE} element={<UserUpdate />} />
    <Route path={ROUTES.USER_PROJECTS} element={<ProjectList />} />
    <Route path={ROUTES.USER_LOGGED} element={<UserList />} />
    <Route path={ROUTES.USER_LOGGED_PROJECTS} element={<ProjectList />} />
  </>
);


