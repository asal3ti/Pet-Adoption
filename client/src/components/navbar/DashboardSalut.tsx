"use client";
import { useMyUser } from "@/hooks/useMyUser";
const DashboardSalut = () => {
  const { user } = useMyUser();
  return (
    <h2 className="font-medium text-md text-green-900">
      Hi {user?.firstName.trim()}!
    </h2>
  );
};

export default DashboardSalut;
