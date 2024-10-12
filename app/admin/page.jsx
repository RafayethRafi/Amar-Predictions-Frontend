import { Suspense } from 'react';
import AdminPageClient from "@/components/AdminPage";
import Loading from "@/components/Loading";

export default function AdminPage() {
  return (
    <Suspense fallback={<Loading />}>
      <AdminPageClient />
    </Suspense>
  );
}