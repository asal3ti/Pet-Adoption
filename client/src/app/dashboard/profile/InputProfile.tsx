import { Dispatch, SetStateAction, use } from "react";
import { UpdateUserDTO } from "@/dtos";
import { useAtom } from "jotai";
import { userAtom } from "@/store/atoms";

interface Props {
  inputKey: keyof UpdateUserDTO;
  type: string;
  newPassword?: string;
  setPassword?: Dispatch<SetStateAction<string>>;
}

const InputProfile = ({
  inputKey,
  type,

  newPassword,
  setPassword,
}: Props) => {
  const [user, setUser] = useAtom(userAtom);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (inputKey === "password" && setPassword) {
      setPassword(event.target.value);
    } else {
      setUser({ ...user, [inputKey]: event.target.value });
    }
  };

  return (
    <div>
      <input
        name={inputKey as string}
        id={inputKey as string}
        type={type}
        value={
          inputKey === "password" ? newPassword : user ? user[inputKey] : ""
        }
        onChange={handleChange}
        className="bg-transparent rounded-md font-bold border border-green-800 p-1"
      />
    </div>
  );
};

export default InputProfile;
