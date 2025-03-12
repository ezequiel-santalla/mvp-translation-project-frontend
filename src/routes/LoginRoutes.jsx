import { Route } from "react-router-dom";
import { ROUTES } from "./paths";
import { Login } from "../components/Login/Login";
import { ForgotPassword } from "../components/Login/ForgotPassword";
import { EnterToken } from "../components/Login/EnterToken";
import { VerifyToken} from "../components/Login/VerifyToken";


export const LoginRoutes = () => (
  <>
    <Route path={ROUTES.USERS} element={<Login />} />
    <Route path={ROUTES.USER_REGISTER} element={<ForgotPassword />} />
    <Route path={ROUTES.USER_UPDATE} element={<EnterToken />} />
    <Route path={ROUTES.USER_PROJECTS} element={<VerifyToken />} />
  </>
);


