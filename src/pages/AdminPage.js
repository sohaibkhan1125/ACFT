import React from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import SEO from '../components/SEO';

const AdminPage = () => {
  return (
    <>
      <SEO title="Admin Panel" noindex={true} />
      <AdminLayout />
    </>
  );
};

export default AdminPage;
