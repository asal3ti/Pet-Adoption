import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="flex my-5 md:h-[85vh] h-[120vh] justify-center flex-col md:flex-row gap-10 items-center">
        <div className="relative bg-[url('/cloud.svg')] bg-contain bg-no-repeat w-full max-w-2xl bg-center flex justify-center items-center">
          <div className="flex flex-col w-[26rem] h-[30rem] text-center gap-5 -mt-10 items-center z-10 justify-center">
            <h1 className="font-['Rubik_Bubbles'] text-logo text-5xl md:text-7xl">
              Find Your Fur-ever Friend
            </h1>
            <p className="text-primary text-xl">
              Swipe, Match, and Adopt Your Perfect Pet Where Love and
              Companionship Unite in Every Swipe
            </p>
            <Link
              href={"/signup"}
              className="text-2xl p-2 bg-logo text-link w-48 rounded-md hover:bg-logo/80 transition duration-200"
            >
              Find a friend!
            </Link>
          </div>
        </div>
        <div className="flex justify-center items-center ">
          <Image
            src="/landing-page.svg"
            alt="dog and a cat"
            width={750}
            height={900}
            className="w-[450px] md:w-[100%] md:h-[100%] h-[450px]"
          />
        </div>
      </section>
    </>
  );
}
