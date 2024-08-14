import Image from "next/image";
import { NavLink } from "./NavLink";
import Link from "next/link";

// const links = [];
export const NavBar = () => {
  return (
    <nav className=" sticky top-0 z-50 bg-opacity-30 bg-black backdrop-blur-md  px-10 flex xl:flex-row  h-20 items-center justify-between">
      <Link color="#eee0d7" href={"/"}>
        <Image
          src="/logo-footer.svg"
          alt="Logo pet adoption"
          width={180}
          height={60}
          priority
        />
      </Link>
      <div className=" flex justify-between gap-20 ">
        {/* {links.map(({ href, title }) => (
          <NavLink href={href} title={title} key={href} />
        ))} */}
      </div>
      <div  className="flex">
        <NavLink href="/auth/signup" title="Sign up" />
        <div className="mx-5  border-r-2 border-r-link"></div>
        <NavLink href="/auth/login" title="Log in" />
      </div>
    </nav>
  );
};
