import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import AdminDashboard from "./AdminDashboard";

export const metadata = { title: "Admin Panel", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  return <AdminDashboard email={session.email} />;
}
