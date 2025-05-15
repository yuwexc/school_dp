import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <AdminContainer>
      <MainContent>
        <Outlet />
      </MainContent>
    </AdminContainer>
  );
};

export default AdminLayout;

const AdminContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
`;