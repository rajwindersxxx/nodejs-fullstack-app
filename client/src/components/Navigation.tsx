import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { HiOutlineLogin, HiOutlineLogout } from "react-icons/hi";

const Navigation = () => {
  const { isLoggedIn, logout } = useAuthContext();
  
  return (
    <nav className="flex-1">
      <ul className="flex items-center justify-end gap-4 flex-1">
        <li>
          <Link to="/">Jobs</Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link to="/post">Post Job</Link>
          </li>
        )}
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
              to="/post"
              className="flex items-center gap-2 rounded-full border p-2"
            >
              Post Job <HiOutlineLogin size={20} />
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
