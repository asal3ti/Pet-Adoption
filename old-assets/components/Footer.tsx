import Image from "next/image";
export const Footer = () => {
  return (
    <footer className="bg-logo p-5 flex justify-center items-center gap-20">
      <div>
        <Image
          src="/logo-footer.svg"
          alt="Logo pet adoption"
          width={180}
          height={60}
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-primary font-semibold">
          Alejandro Silva & Maryam Setayeshnia
        </p>
        <p className="text-primary font-semibold"> &copy; 2024 Pet Connect</p>
      </div>
    </footer>
  );
};
