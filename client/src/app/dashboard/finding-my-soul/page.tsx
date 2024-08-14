import Image from "next/image";
import PetContent from "../../../components/pet/PetContent";

export default function FindingMySoul() {
  return (
    <section className="relative w-full flex flex-col items-center ">
      <div className="relative w-full h-[29vh] flex flex-col items-center justify-center text-white bg-black">
        <Image
          src="/finding-my-soul.png"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center" }} // Adjust position
          height={400}
          width={400}
          priority
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center gap-3 p-3 text-center">
          <h1 className="text-4xl font-medium">Finding your soul</h1>
          <p className="text-xl">
            Check out these beautiful friends waiting to meet you!
          </p>
        </div>
      </div>
      <PetContent />
    </section>
  );
}
