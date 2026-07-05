import { redirect } from "next/navigation";

export default function AdminPreordersRedirect() {
  redirect("/admin/orders");
}
