import { Link } from "react-router-dom";
function Navbar() {
  return (
    <header>
      <nav className="w-screen bg-white h-10 flex items-center justify-center">
        <Link to={'/'} className="h-full flex items-center"><img src="/brand.svg" className="h-[80%]" alt="" /></Link>
      </nav>
    </header>
  );
}

export default Navbar;
