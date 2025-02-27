import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LogoutButton } from "../Button/LogoutButton";
import UserService from "../../services/UserService";
import verbaliaLogo from "../../img/verbaliaLogo.webp";
import { AuthContext } from "../context/AuthContext";

export const NavBar = () => {
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = await UserService.getMyUser();
        setUserName(user.data.name);
        setUserLastName(user.data.lastName);
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };

    if (isAuthenticated) {
      fetchUserName();
    }
  }, [isAuthenticated]);

  return (
    <header className="bg-[#023144] flex items-center justify-between p-6">
      <Link to="/">
        <img className="w-64" src={verbaliaLogo} alt="Verbalia Logo" />
      </Link>
      <nav className="flex flex-grow items-center justify-end mr-10">
        <ul className="flex items-center space-x-10 text-white">
          <li className="text-lg">
            <Link to="/users">Users</Link>
          </li>
          <li className="text-lg">
            <Link to="/projects">Projects</Link>
          </li>
          <li className="text-lg">
            <Link to="/language-pairs">Language Pairs</Link>
          </li>
        </ul>
        {isAuthenticated && (
          <div className="ml-28 flex items-center space-x-10">
            <span className="text-lg text-white">{userName} {userLastName}</span>
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <img src="" alt="Profile" className="w-full h-full rounded-full object-cover" />
            </div>
            <LogoutButton />
          </div>
        )}
      </nav>
    </header>
  );
};