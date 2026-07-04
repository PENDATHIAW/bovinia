import { getAdminBlogPosts } from "@/lib/data/admin-queries";
import { AdminBlogPageClient } from "@/components/admin/AdminBlogPageClient";

export default async function AdminBlogPage() {
  const posts = await getAdminBlogPosts();
  return <AdminBlogPageClient posts={posts} />;
}
