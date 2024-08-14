import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

interface Props {
  type: "success" | "info" | "warning" | "error" | "loading" | undefined;
}
const PetAlert = ({ type }: Props) => {
  return (
    <Alert status={type} textAlign={"center"}>
      <AlertIcon />
      {type === "success" && "Added it in the waiting list!"}
      {type === "info" && "Remove it to the waiting list"}
    </Alert>
  );
};

export default PetAlert;
