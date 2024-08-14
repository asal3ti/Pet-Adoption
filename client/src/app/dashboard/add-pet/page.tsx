import { AddPetForm } from "./AddPetForm";

const PetForm: React.FC = () => {
  return (
    <section className="container p-20">
      <div className="flex justify-between items-center pe-5">
        <h1 className="text-3xl text-green-700 font-semibold">
          Add a new friend
        </h1>
      </div>
      <AddPetForm />
    </section>
  );
};

export default PetForm;
