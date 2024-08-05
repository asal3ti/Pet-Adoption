import PetList from "./PetList";

export default function FindingMySoul() {
  return (
    <section className="p-5 w-full flex flex-col gap-10">
      <div className="p-5 flex flex-col items-center gap-5 justify-center">
        <h1 className="text-5xl text-green-800 font-medium">
          Finding your soul
        </h1>
        <p className="text-2xl text-green-700">
          Check out these beautiful friends waiting to meet you!
        </p>
      </div>
      <PetList />
    </section>
  );
}
