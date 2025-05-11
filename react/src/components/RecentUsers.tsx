import styled from 'styled-components';
import { User } from '../interfaces/user';

const UsersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f1f5f9;
  }
`;

const UserInfo = styled.div`
  flex-grow: 1;
`;

const UserName = styled.div`
  font-weight: 500;
  color: #1e293b;
`;

const UserEmail = styled.div`
  font-size: 0.75rem;
  color: #64748b;
`;

const UserDate = styled.div`
  font-size: 0.75rem;
  color: #64748b;
  white-space: nowrap;
`;

interface RecentUsersProps {
  users: User[];
}

export const RecentUsers = ({ users }: RecentUsersProps) => {
  return (
    <UsersList>
      {users.length > 0 ? (
        users.slice(0, 5).map(user => (
          <UserItem key={user.id_user}>
            <UserInfo>
              <UserName>{user.first_name} {user.last_name}</UserName>
              <UserEmail>{user.email}</UserEmail>
            </UserInfo>
            <UserDate>
              {new Date(user.created_at || '').toLocaleDateString()}
            </UserDate>
          </UserItem>
        ))
      ) : (
        <div style={{ color: '#64748b', textAlign: 'center', padding: '1rem' }}>
          Нет новых пользователей
        </div>
      )}
    </UsersList>
  );
};