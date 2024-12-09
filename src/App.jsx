import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import { Login } from "./components/Login/Login"
import { UserList } from "./components/Users/UserList";
import { UserRegister } from "./components/Users/UserRegister";
import { UserDetail } from "./components/Users/UserDetail";
import { ProjectList } from "./components/Projects/ProjectList";
import { ProjectRegister } from "./components/Projects/ProjectRegister";

const App = () => (
  <>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/register" element={<UserRegister />} />
        <Route path="users/update/:email" element={<UserRegister />} />
        {/* <Route path="/users/email/:email" element={<UserDetail />} /> */}
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/register" element={<ProjectRegister />}/>
        {/* <Route path="/projects/:id" element={ProjectDetail} /> */}
      </Routes>
    </BrowserRouter>
  </>
);

export default App;
