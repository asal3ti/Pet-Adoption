"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface Props {
  href: string;
  title: string;
}

const DashboardLink = ({ href, title }: Props) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`font-medium text-gray-700 py-2 px-2 ${
        pathname === href && "bg-[#7E836D] text-white text-base"
      } hover:bg-[#7E836D] hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out border-b-2 border-gray-300 last:border-b-0`}
    >
      {title}
    </Link>
  );
};

export default DashboardLink;
