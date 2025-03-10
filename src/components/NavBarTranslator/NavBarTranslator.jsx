import { Link } from "react-router-dom";
import verbaliaLogo from "../../img/verbaliaLogo.webp";

export const NavBarTranslator = () => {
  return (
    <header className="bg-[#023144] flex items-center justify-between p-6">
      <Link to="/">
        <img className="w-64" src={verbaliaLogo} alt="Verbalia Logo" />
      </Link>

      <nav className="mr-16">
        <ul className="flex space-x-10 text-white">
          <li>
            <Link to="/users/me/user" className="text-lg">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/projects" className="text-lg">
              Projects
            </Link>
          </li>
          <li>
            <Link to="/language-pairs" className="text-lg">
              Language Pairs
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

