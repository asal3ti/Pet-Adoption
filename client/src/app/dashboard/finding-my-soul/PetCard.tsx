import React from "react";

const PetCard = () => {
  return (
    <div className="relative overflow-hidden flex flex-col justify-end w-[420px] h-[500px] bg-[url('http://petharbor.com/get_image.asp?res=DETAIL&id=A518499&location=MONT')] bg-cover bg-no-repeat rounded-md shadow-md">
      <div className=" flex justify-center w-full h-[150px] bg-opacity-70 bg-green-950 rounded-t-[5rem] absolute hover:bottom-0 -bottom-16 transition-all duration-300">
        <h1 className="text-2xl text-green-600 font-medium mt-5">Pet name</h1>
      </div>
    </div>
  );
};

export default PetCard;
