import { Link } from "react-router-dom";
import { HiLogin } from "react-icons/hi";

const Header = () => {
  return (
    <header className="sticky top-0 flex items-center justify-between bg-gray-100 px-4 py-2 shadow-md z-40">
      <Link to="/" className="text-2xl">JOB BOARD</Link>
      <nav>
        <ul className="flex items-center gap-4">
          <li>
            <Link to="/">Jobs</Link>
          </li>
          <li>
            <Link to="/post">Post Job</Link>
          </li>
          <li>
            <Link to="/login"><HiLogin size={20}/></Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
