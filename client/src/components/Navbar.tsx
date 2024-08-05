import Image from "next/image";
import { NavLink } from "./NavLink";

// const links = [];
export const Navbar = () => {
  return (
    <nav className="py-5 px-10 flex xl:flex-row gap-5 items-center justify-between">
      <div>
        <Image
          src="/logo.svg"
          alt="Logo pet adoption"
          width={180}
          height={60}
        />
      </div>
      <div className=" flex justify-between gap-20 ">
        {/* {links.map(({ href, title }) => (
          <NavLink href={href} title={title} key={href} />
        ))} */}
      </div>
      <div className="flex">
        <NavLink href="signup" title="Sign up" />
        <div className="mx-5  border-r-2 border-r-link"></div>
        <NavLink href="login" title="Log in" />
      </div>
    </nav>
  );
};
