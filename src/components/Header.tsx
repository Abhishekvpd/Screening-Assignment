"use client";

import { BiCart } from "react-icons/bi";
import { FiLogOut, FiSearch } from "react-icons/fi";
import OfferBar from "./OfferBar";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems: string[] = [
    "Categories",
    "Sale",
    "Clearance",
    "New Stock",
    "Trending",
  ];

  const signOutHandler = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      if (response.data.success) toast.success("You have been logged out");
      router.push("/");
    } catch (error: any) {
      toast.error(error.response.data.error || error.message);
    }
  };

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
          <span className="text-[32px] font-bold mb-3">ECOMMERCE</span>
          <nav className="flex gap-8">
            {navItems.map((item, index) => (
              <a href="#" className="link" key={index}>
                {item}
              </a>
            ))}
          </nav>
          <div className="flex gap-8">
            <FiSearch className="icon" />
            <BiCart className="icon" />
            {pathname === "/interests" && (
              <FiLogOut className="icon" onClick={signOutHandler} />
            )}
          </div>
        </div>
        <OfferBar />
      </header>
    </>
  );
}

export default Header;
