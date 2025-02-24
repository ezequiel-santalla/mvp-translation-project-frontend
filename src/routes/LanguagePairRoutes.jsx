import { Route } from "react-router-dom";
import { ROUTES } from "./paths";
import { LanguagePairList } from "../components/LanguagePairs/LanguagePairList";
import { LanguagePairRegister } from "../components/LanguagePairs/LanguagePairRegister";

export const LanguagePairRoutes = () => (
  <>

    <Route path={ROUTES.LANGUAGE_PAIRS} element={<LanguagePairList />} />
    <Route path={ROUTES.LANGUAGE_PAIR_REGISTER} element={<LanguagePairRegister />} />
    
  </>
);