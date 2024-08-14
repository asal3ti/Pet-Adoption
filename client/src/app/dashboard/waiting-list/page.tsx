import PetContent from "@/components/pet/PetContent";
import Image from "next/image";

export default function WaitingList() {
  return (
    <section className="relative w-full flex flex-col items-center bg-almond min-h-screen ">
      <div className="relative w-full h-[29vh] flex flex-col items-center justify-center text-white bg-black">
        <Image
          src="/waiting-list.jpeg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center" }} // Adjust position
          height={400}
          width={400}
          priority
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center gap-3 p-3 text-center">
          <h1 className="text-4xl font-medium">Waiting List</h1>
          <p className="text-xl">
            Here you will find your friends waiting for an update to meet you!
          </p>
        </div>
      </div>
      <PetContent />
    </section>
  );
}
