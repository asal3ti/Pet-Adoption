import PetList from "./PetList";
import './styles.css';

export default function FindingMySoul() {
  return (
    <section className="relative w-full flex flex-col items-center overflow-hidden">
      <div className="relative w-full h-[25vh] flex flex-col items-center justify-center text-white bg-black mb-8">
        <img
          src="https://www.oceansideanimalhospital.ca/wp-content/uploads/sites/271/2022/04/108-1920x700.png"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center' }}  // Adjust position
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center gap-3 p-3 text-center">
          <h1 className="text-4xl font-medium">Finding your soul</h1>
          <p className="text-xl">Check out these beautiful friends waiting to meet you!</p>
        </div>
      </div>
      <div>
        <PetList />
      </div>
    </section>
  );
}
