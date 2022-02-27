import Image from "next/image";
import logoImage from "../../public/img/logo.png";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";

const Header = () => {
  return (
    <header>
      {/* Top Nav */}
      <div className="flex flex-grow p-1 py-2 items-center bg-amazon_blue">
        {/* Logo */}
        <div className="flex flex-grow sm:flex-grow-0 mt-2 items-center">
          <Image
            src={logoImage}
            alt="Amazon Logo"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>
        {/* Seachbar */}
        <div className="hidden sm:flex flex-grow items-center h-10 rounded-md bg-yellow-400 hover:bg-yellow-500 cursor-pointer">
          <input
            type="text"
            className="p-2 px-4 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none"
          />
          <SearchIcon className="h-12 p-4" />
        </div>
        {/* Right-side */}
        <div className="flex items-center text-xs space-x-6 mx-6 whitespace-nowrap text-white">
          <div className="link">
            <p>Hello Abdullah</p>
            <p className="font-extrabold md:text-sm">Accounts & Lists</p>
          </div>
          <div className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div className="link relative flex items-center">
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
              0
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div></div>
    </header>
  );
};

export default Header;
