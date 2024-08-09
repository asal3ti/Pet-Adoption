"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UpdateUserDTO } from "@/dtos";
import InputProfile from "./InputProfile";
import { changePassword, updateUser } from "@/services/userService";
import { tokenAtom, userAtom } from "@/store/atoms";
import { useAtom } from "jotai";

interface Props {
  children: React.ReactNode;
  title: string;
  label: string;
  keys: keyof UpdateUserDTO | (keyof UpdateUserDTO)[];
  type: string;
}

const InfoProfile = ({ children, title, label, keys, type }: Props) => {
  const [token] = useAtom(tokenAtom);
  const [toggle, setToggle] = useState(false);
  const [newPassword, setPassword] = useState("");
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  const validateForm = () => {
    // Simple validation example based on input keys
    for (const key of Array.isArray(keys) ? keys : [keys]) {
      if (
        key === "email" &&
        user &&
        !/\S+@\S+\.\S+/.test(user[key] as string)
      ) {
        alert("Invalid email format");
        return false;
      }
      if (
        key === "password" &&
        !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&_]{8,}$/.test(
          newPassword
        )
      ) {
        alert(
          "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, and one number"
        );
        return false;
      }

      if (key === "phone" && user && !/^\d{10}$/.test(user[key] as string)) {
        alert("Invalid phone number. It should be 10 digits.");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      setUser(null);
      return;
    }

    const isPassword =
      (Array.isArray(keys) && keys.includes("password")) || keys === "password";
    try {
      isPassword
        ? await changePassword(newPassword, token)
        : await updateUser(user as UpdateUserDTO, token);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user");
    }
  };

  const renderInputProfiles = () => {
    if (Array.isArray(keys)) {
      return keys.map((key) => (
        <InputProfile
          inputKey={key}
          type={type}
          newPassword={newPassword}
          setPassword={setPassword}
          key={key}
        />
      ));
    } else {
      return (
        <InputProfile
          inputKey={keys}
          type={type}
          newPassword={newPassword}
          setPassword={setPassword}
          key={keys}
        />
      );
    }
  };

  return (
    <div className="mb-4 p-5">
      <p className="text-2xl text-green-700 font-semibold">{title}</p>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <label htmlFor={Array.isArray(keys) ? keys[0] : keys}>
              {label}
            </label>
            {!toggle ? (
              children
            ) : (
              <div className="flex gap-5 items-center justify-center">
                {renderInputProfiles()}
              </div>
            )}
          </div>
          <button
            type={!toggle ? "submit" : "button"}
            onClick={() => setToggle(!toggle)}
            className="bg-black text-white px-4 py-2 rounded hover:bg-slate-700"
          >
            {toggle ? "Save" : "Change"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InfoProfile;
