import { NavBar } from "../NavBar/NavBar";

export const MainLayout = ({ children }) => (
  <>
    <NavBar />

    <main className="container mx-auto p-4">{children}</main>
  </>
);
