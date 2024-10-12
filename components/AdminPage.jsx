'use client';

import React from 'react';
import useAuth from '@/lib/hooks/useAuth';
import AdminPageContent from '@/app/admin/AdminPageContent';
import Loading from '@/components/Loading';

const AdminPageClient = () => {
  const auth = useAuth();

  if (!auth) {
    return <Loading />;
  }

  if (!auth.user || !auth.user.isAdmin) {
    return <div>Access Denied. You must be an admin to view this page.</div>;
  }

  return <AdminPageContent auth={auth} />;
};

export default AdminPageClient;