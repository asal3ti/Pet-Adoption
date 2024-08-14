import Image from "next/image";
import Logout from "../auth/Logout";
import Link from "next/link";
import DashboardLink from "./DashboardLink";
import DashboardSalut from "./DashboardSalut";

interface Props {
  children: React.ReactNode;
}

const links = [
  {
    href: "",
    title: "Main content",
  },
  {
    href: "/finding-my-soul",
    title: "Finding my soul",
  },
  {
    href: "/waiting-list",
    title: "Waiting list",
  },
  {
    href: "/profile",
    title: "My profile",
  },
];

export const DashboardNavBar = ({ children }: Props) => {
  return (
    <section className="h-full flex">
      <nav className="bg-transparent h-screen fixed shadow-xl px-3 w-30 md:w-60 lg:w-80 overflow-x-hidden transition-transform duration-300 ease-in-out">
        <div className="space-y-6 md:space-y-10 mt-10">
          <Link href={"/"}>
            <Image
              src="/logo.svg"
              alt="Logo pet adoption"
              width={180}
              height={60}
              priority
            />
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              href={"/dashboard/profile"}
              className="hover:bg-black relative duration-150 rounded-full hover:bg-opacity-50 flex justify-center"
            >
              <Image
                src="/cat-dashboard.gif"
                alt="Avatar user"
                className="w-10 md:w-16 -z-10 rounded-full"
                width={200}
                height={100}
              />
            </Link>
            <div>
              <DashboardSalut />
              <p className="text-xs text-gray-600">Welcome back!</p>
            </div>
          </div>
          <div className="flex flex-col justify-between h-full gap-8">
            <div className="flex flex-col space-y-2">
              {links.map(({ href, title }) => (
                <DashboardLink
                  href={"/dashboard" + href}
                  title={title}
                  key={href}
                />
              ))}
            </div>
            <Logout />
          </div>
        </div>
      </nav>
      <div className="ml-30 md:ml-60 lg:ml-80 w-full">{children}</div>
    </section>
  );
};
