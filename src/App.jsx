import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import { Login } from "./components/Login/Login"
import { UserList } from "./components/User/UserList";
import { UserRegister } from "./components/User/UserRegister";
import { UserDetail } from "./components/User/UserDetail";
import { ProjectList } from "./components/Project/ProjectList";
import { ProjectRegister } from "./components/Project/ProjectRegister";
import { LanguagePairList } from "./components/LanguagePairs/LanguagePairList";


const App = () => (
  <>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/register" element={<UserRegister />} />
        <Route path="users/update/:email" element={<UserRegister />} />
        <Route path="/users/email/:email" element={<UserDetail />} />
        <Route path="/users/projects/:email" element={<ProjectList />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/register" element={<ProjectRegister />}/>
        <Route path="/language-pairs" element={<LanguagePairList />} />
        <Route path="/language-pairs/:email" element={<LanguagePairList />} />
        {/* <Route path="/projects/:id" element={ProjectDetail} /> */}
      </Routes>
    </BrowserRouter>
  </>
);

export default App;
