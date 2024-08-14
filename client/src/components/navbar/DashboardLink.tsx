"use client";
import { useMyUser } from "@/hooks/useMyUser";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface Props {
  href: string;
  title: string;
  role: string[];
}

const DashboardLink = ({ href, title, role }: Props) => {
  const pathname = usePathname();
  const { user } = useMyUser();

  if (role.indexOf(user?.role) === -1) return null;

  return (
    <Link
      href={href}
      className={` text-lg font-medium text-gray-700 py-2 px-2 ${
        pathname === href && "bg-[#7E836D] text-white text-lg"
      } hover:bg-[#7E836D] hover:text-white  rounded-md transition duration-150 ease-in-out border-b-2 border-gray-300 last:border-b-0`}
    >
      {title}
    </Link>
  );
};

export default DashboardLink;
