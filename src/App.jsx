import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import UserList from "./components/Users/UserList";
import UserRegister from "./components/Users/UserRegister";

const App = () => (
  <>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/users" element={<UserList />} />
        <Route path="/users/register" element={<UserRegister />} />
        <Route path="users/update/:email" element={<UserRegister />} />
      </Routes>
    </BrowserRouter>
  </>
);

export default App;
