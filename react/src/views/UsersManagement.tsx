import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import UserEditModal from '../components/UserEditModal';
import { User } from '../interfaces/user';
import { State } from '../interfaces/requests';
import { Title } from '../styles/forms';
import { AppDispatch, RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUser } from '../features/userSlice';

const UsersManagement = () => {
    const users = useSelector<RootState, User[] | null>((state) => state.user.users);
    const { status, error } = useSelector((state: State) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleSave = async (userData: User) => {
        dispatch(updateUser(userData)).then(() => dispatch(fetchUsers()));
    };

    const filteredUsers = users?.filter(user => {
        const searchLower = searchQuery.toLowerCase();
        return (
            user.last_name?.toLowerCase().includes(searchLower) ||
            user.first_name?.toLowerCase().includes(searchLower) ||
            (user.middle_name && user.middle_name.toLowerCase().includes(searchLower)) ||
            user.email?.toLowerCase().includes(searchLower) ||
            user.phone?.includes(searchQuery)
        );
    }) || [];

    const skeletonRows = 5;

    return (
        <Container>
            <Header>
                <Title>Управление пользователями</Title>
                <SearchContainer>
                    <SearchInput
                        type="text"
                        placeholder="Поиск по ФИО, email или телефону"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <SearchIcon>🔍</SearchIcon>
                </SearchContainer>
            </Header>

            <TableContainer>
                <Table>
                    <TableHeader>
                        <tr>
                            <TableHeaderCell>ID</TableHeaderCell>
                            <TableHeaderCell>ФИО</TableHeaderCell>
                            <TableHeaderCell>Email</TableHeaderCell>
                            <TableHeaderCell>Телефон</TableHeaderCell>
                            <TableHeaderCell>Роль</TableHeaderCell>
                            <TableHeaderCell>Действия</TableHeaderCell>
                        </tr>
                    </TableHeader>
                    <tbody>
                        {status === 'loading' ? (
                            Array(skeletonRows).fill(0).map((_, index) => (
                                <TableRow key={`skeleton-${index}`}>
                                    <TableCell><SkeletonBox /></TableCell>
                                    <TableCell><SkeletonBox /></TableCell>
                                    <TableCell><SkeletonBox /></TableCell>
                                    <TableCell><SkeletonBox /></TableCell>
                                    <TableCell><SkeletonBox width="60%" /></TableCell>
                                    <TableCell>
                                        <Actions>
                                            <SkeletonIconButton />
                                            <SkeletonIconButton />
                                        </Actions>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : filteredUsers.length > 0 ? (
                            filteredUsers.map(user => (
                                <TableRow key={user.id_user}>
                                    <TableCell>{user.id_user}</TableCell>
                                    <TableCell>{`${user.last_name} ${user.first_name} ${user.middle_name || ''}`}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell style={{ fontVariantNumeric: 'tabular-nums' }}>{user.phone}</TableCell>
                                    <TableCell><RoleBadge>{user.role?.role_name}</RoleBadge></TableCell>
                                    <TableCell>
                                        <Actions>
                                            <IconButton onClick={() => handleEdit(user)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Actions>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} style={{ textAlign: 'center' }}>
                                    {status === 'failed' ? `Ошибка: ${error}` :
                                        searchQuery ? 'Ничего не найдено' : 'Нет данных'}
                                </TableCell>
                            </TableRow>
                        )}
                    </tbody>
                </Table>
            </TableContainer>

            <UserEditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                user={editingUser!}
            />
        </Container>
    );
};

export default UsersManagement;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
`;

const SearchInput = styled.input`
  width: calc(100% - 3.5rem);
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: all 0.2s;
  background-color: #f8fafc;
  
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }
  
  &::placeholder {
    color: #94a3b8;
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
`;

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const SkeletonBox = styled.div<{ width?: string }>`
  background: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s infinite linear;
  height: 16px;
  width: ${props => props.width || '80%'};
  border-radius: 4px;
`;

const SkeletonIconButton = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 6px;
`;

const Container = styled.div`
    padding: 2rem;
    background-color: #f8fafc;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
`;

const TableContainer = styled.div`
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHeader = styled.thead`
    background-color: #f1f5f9;
`;

const TableHeaderCell = styled.th`
    padding: 1rem 1.5rem;
    text-align: left;
    font-size: 0.75rem;
    color: #64748b;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

const TableRow = styled.tr`
    border-bottom: 1px solid #e2e8f0;
    transition: background-color 0.2s;
    
    &:hover {
        background-color: #f8fafc;
    }
    
    &:last-child {
        border-bottom: none;
    }
`;

const TableCell = styled.td`
    padding: 1rem 1.5rem;
    color: #334155;
    font-size: 0.875rem;
`;

const RoleBadge = styled.span`
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background-color: #e0f2fe;
    color: #0369a1;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
`;

const Actions = styled.div`
    display: flex;
    justify-content: center;
    gap: 0.5rem;
`;

const IconButton = styled.button<{ danger?: boolean }>`
    background-color: ${props => props.danger ? '#fee2e2' : '#e0e7ff'};
    color: ${props => props.danger ? '#dc2626' : '#4f46e5'};
    border: none;
    padding: 0.5rem;
    border-radius: 0.375rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    
    &:hover {
        background-color: ${props => props.danger ? '#fecaca' : '#c7d2fe'};
        transform: translateY(-1px);
    }
`;

const EditIcon = styled.span.attrs({ children: '✏️' })`
    font-size: 0.875rem;
`;