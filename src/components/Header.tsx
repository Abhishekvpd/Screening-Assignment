import { BiCart } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import OfferBar from "./OfferBar";

function Header() {
  const navItems: string[] = [
    "Categories",
    "Sale",
    "Clearance",
    "New Stock",
    "Trending",
  ];
  return (
    <>
      <header>
        <div className="flex justify-end p-3 px-10">
          <ul className="flex gap-5">
            <li className="li-primary cursor-pointer">Help</li>
            <li className="li-primary cursor-pointer">Orders & Returns</li>
            <li className="li-primary">Hi, John</li>
          </ul>
        </div>
        <div className="flex items-center justify-between px-10">
          <span className="text-[32px] font-bold">ECOMMERCE</span>
          <nav className="flex gap-8">
            {navItems.map((item) => (
              <a href="javascript:void(0);" className="link">{item}</a>
            ))}
          </nav>
          <div className="flex gap-8">
            <FiSearch className="icon" />
            <BiCart className="icon" />
          </div>
        </div>
        <OfferBar />
      </header>
    </>
  );
}

export default Header;
