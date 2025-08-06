import { Link } from "react-router-dom";
import { HiOutlineLogin, HiOutlineLogout } from "react-icons/hi";
import { useAuthContext } from "../context/AuthContext";
const Header = () => {
  const { isLoggedIn, logout } = useAuthContext();

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between bg-gray-100 px-4 py-2 shadow-md">
      <Link to="/" className="text-2xl">
        JOB BOARD
      </Link>
      <nav>
        <ul className="flex items-center gap-4">
          <li>
            <Link to="/">Jobs</Link>
          </li>
          <li>
            <Link to="/post">Post Job</Link>
          </li>
          <li>
            {isLoggedIn ? (
              <button
                className="flex cursor-pointer items-center gap-2 rounded-full border p-2"
                onClick={() => logout()}
              >
                Logout <HiOutlineLogout size={20} />
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 rounded-full border p-2"
              >
                Login <HiOutlineLogin size={20} />
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
