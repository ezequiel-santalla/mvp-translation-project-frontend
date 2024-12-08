import { Link } from "react-router-dom";
import verbaliaLogo from "../../img/verbaliaLogo.webp";

const NavBar = () => {
  return (
    <header className="bg-[#023144] flex items-center justify-between p-6">
      <Link to="/">
        <img className="w-64" src={verbaliaLogo} alt="Verbalia Logo" />
      </Link>

      <nav className="mr-16">
        <ul className="flex space-x-10 text-white">
          <li>
            <Link to="/users" className="text-lg">
              Users
            </Link>
          </li>
          <li>
            <Link to="/projects" className="text-lg">
              Projects
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;

