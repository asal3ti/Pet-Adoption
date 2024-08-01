import { DashboardNavBar, ProtectedRoute } from "@/components";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <DashboardNavBar>{children}</DashboardNavBar>
    </ProtectedRoute>
  );
}
