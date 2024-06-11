import Link from "next/link";

interface Props {
  href: string;
  title: string;
}
export const NavLink = ({ href, title }: Props) => {
  return (
    <Link
      href={href}
      className="text-link  text-3xl font-semibold hover:text-logo transition  duration-200 "
    >
      {title}
    </Link>
  );
};
