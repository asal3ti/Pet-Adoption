import Image from "next/image";
import { NavLink } from "./NavLink";
import Link from "next/link";

// const links = [];
export const NavBar = () => {
  return (
    <nav className="py-5 px-10 flex xl:flex-row gap-5 items-center justify-between">
      <Link href={"/"}>
        <Image
          src="/logo.svg"
          alt="Logo pet adoption"
          className="w-auto h-auto"
          width={180}
          height={60}
        />
      </Link>
      <div className=" flex justify-between gap-20 ">
        {/* {links.map(({ href, title }) => (
          <NavLink href={href} title={title} key={href} />
        ))} */}
      </div>
      <div className="flex">
        <NavLink href="/auth/signup" title="Sign up" />
        <div className="mx-5  border-r-2 border-r-link"></div>
        <NavLink href="/auth/login" title="Log in" />
      </div>
    </nav>
  );
};
