"use client";
import PetList from "./PetList";
import PetAlert from "./PetAlert";
import { useState } from "react";
const PetContent = () => {
  const [display, setDisplay] = useState(false);
  const [type, setType] = useState<
    "success" | "info" | "warning" | "error" | "loading" | undefined
  >();
  return (
    <>
      {display && <PetAlert type={type} />}
      <div className="mt-8">
        <PetList setDisplay={setDisplay} setType={setType} />
      </div>
    </>
  );
};

export default PetContent;
