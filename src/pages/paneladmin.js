import React from 'react';
import { Div, PageContainer } from '../components/cssComponents';
import { useUser } from '../constext/UserContext';

const AdminPage = () => {
  const { user } = useUser();
  if (!user) {
    return (
      <div style={{ marginTop: '100px', color: 'red' }}>
        <h1>Access Denied</h1>
      </div>
    );
  }

  return (
    <Div>
      <PageContainer>
        <h2>Witaj {user.username} w panelu admina</h2>
        <p>tutaj bedziesz mogł edytować swoje dane oraz zarządzać łowiskiem.</p>
      </PageContainer>
    </Div>
  );
};

export default AdminPage;
