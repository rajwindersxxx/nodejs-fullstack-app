import { Link, useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import SearchForm from "./forms/SearchForm";
const Header = () => {
  const location = useLocation();
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between bg-gray-100 px-4 py-2 shadow-md">
      <Link to="/" className="flex-1 text-2xl">
        JOB BOARD
      </Link>
      {location.pathname === "/" && <SearchForm />}
      <Navigation />
    </header>
  );
};

export default Header;
