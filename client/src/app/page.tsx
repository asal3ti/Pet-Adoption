"use client";
import React from "react";
import { Footer, NavBar, PetCard } from "@/components";
import Link from "next/link";
import { usePets } from "@/hooks/usePets";
import "./styles.css";

export default function Home() {
  const { pets } = usePets();

  // Function to handle scroll
  const handleScroll = () => {
    document.getElementById("scroll-target")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <NavBar />
      <section className="relative bg-customBg flex md:h-[85vh] h-full justify-center md:flex-row gap-10 mt-[-5rem] min-h-screen">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        ></div>

        {/* Cloud Background Container */}
        <div className="relative bg-[url('/cloud.svg')] bg-auto bg-no-repeat w-full h-full bg-center flex justify-center items-center z-10 left-[-28%]">
          <div className="flex flex-col w-[26rem] h-[30rem] text-center gap-5 items-center justify-center">
            <h1 className="font-['San-serif'] text-logo text-3xl md:text-6xl">
              Find Your <span><br></br></span> Fur-ever Friend
            </h1>
            <p className="text-primary text-lg">
              Swipe, Match, and Adopt Your Perfect Pet Where Love and
              Companionship Unite in Every Swipe
            </p>
            <Link
              href={"/auth/signup"}
              className="text-2xl p-2 bg-logo text-link w-48 rounded-md hover:bg-logo/80 transition duration-200"
            >
              Find a friend!
            </Link>
          </div>
        </div>

        <div className="flex justify-center items-center relative z-10">
          {/* Placeholder for potential image */}
        </div>
        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg
            viewBox="0 0 1200 275"
            xmlns="http://www.w3.org/2000/svg"
            className="block w-full"
          >
            <path
              fill="#DACBB5"
              d="M0,192L60,213.3C120,235,240,277,360,272C480,267,600,213,720,176C840,139,960,117,1080,138.7C1200,160,1320,224,1380,256L1440,288L1440,320L0,320Z"
            ></path>
          </svg>
        </div>

        {/* Scroll Down Arrow */}
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={handleScroll}
        >
          <div className="arrow-down"></div>
          <div className="arrow-down arrow-down-delay"></div>
        </div>
      </section>

      {/* Pet Cards Section */}
      <section id="scroll-target" className="py-12 bg-vanilla px-6 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-8">Who are waiting for You?</h2>
        <p className="mb-10">If you want to find a friend, just click on see more!</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 h-72 md:grid-cols-3 gap-8">
          {pets.slice(9, 12).map((pet) => (
            <PetCard key={pet.animalId} pet={pet} />
          ))}
        </div>
        <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 h-72 md:grid-cols-3 gap-8">
          {pets.slice(6, 9).map((pet) => (
            <PetCard key={pet.animalId} pet={pet} />
          ))}
        </div>
        <Link
          href={"/auth/signup"}
          className="text-center mt-10 text-xl p-2 bg-logo text-link w-48 rounded-full hover:bg-logo/80 transition duration-200"
        >
          See more
        </Link>
      </section>

{/* About Us Section
<section className="relative py-12 bg-light px-6 flex flex-col items-center overflow-hidden">
        <div className="relative z-10 text-center">
          <h2 className="text-3xl font-bold mb-6">About Us</h2>
          <p className="text-lg mb-6">
            We are passionate about connecting pets with loving families. Our mission is to provide a seamless and joyful experience for adopting pets and finding your perfect companion.
          </p>
          <p className="text-lg">
            Our team is dedicated to ensuring that every pet has a chance to find a forever home. We believe that every pet deserves a loving family and every family deserves a furry friend.
          </p>
        </div>
      </section> */}


      <Footer />
    </>
  );
}
