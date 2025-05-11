import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Category } from '../interfaces/category';
import { State } from '../interfaces/requests';
import { Title } from '../styles/forms';
import { AppDispatch, RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, postCategory } from '../features/categorySlice';
import CategoryEditModal from '../components/CategoryEditModal';

const CategoriesManagement = () => {
    const categories = useSelector<RootState, Category[] | null>((state) => state.categories.categories);
    const { status, error } = useSelector((state: State) => state.categories);
    const dispatch = useDispatch<AppDispatch>();

    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleEdit = (category: Category) => {
        setEditingCategory(category);
        setIsModalOpen(true);
    };

    const handleSave = async (categoryData: Category) => {
        dispatch(postCategory(categoryData))
    };

    const skeletonRows = 5;

    return (
        <Container>
            <Header>
                <Title>Управление категориями</Title>
                <AddButton onClick={() => { setEditingCategory(null); setIsModalOpen(true); }}>
                    + Добавить категорию
                </AddButton>
            </Header>

            <TableContainer>
                <Table>
                    <TableHeader>
                        <tr>
                            <TableHeaderCell>ID</TableHeaderCell>
                            <TableHeaderCell>Название</TableHeaderCell>
                            <TableHeaderCell>Иконка</TableHeaderCell>
                            <TableHeaderCell>Действия</TableHeaderCell>
                        </tr>
                    </TableHeader>
                    <tbody>
                        {status === 'loading' ? (
                            Array(skeletonRows).fill(0).map((_, index) => (
                                <TableRow key={`skeleton-${index}`}>
                                    <TableCell><SkeletonBox width="50px" /></TableCell>
                                    <TableCell><SkeletonBox /></TableCell>
                                    <TableCell><SkeletonBox /></TableCell>
                                    <TableCell><SkeletonBox width="30px" /></TableCell>
                                    <TableCell><SkeletonBox width="80px" /></TableCell>
                                    <TableCell>
                                        <Actions>
                                            <SkeletonIconButton />
                                            <SkeletonIconButton />
                                        </Actions>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : categories && categories.length > 0 ? (
                            categories.map(category => (
                                <TableRow key={category.id_category}>
                                    <TableCell>{category.id_category?.toString().padStart(3, '0')}</TableCell>
                                    <TableCell>{category.category_name}</TableCell>
                                    <TableCell>
                                        {category.image && (
                                            <IconPreview src={category.image} alt={`Иконка ${category.image}`} />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Actions>
                                            <IconButton onClick={() => handleEdit(category)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Actions>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} style={{ textAlign: 'center' }}>
                                    {status === 'failed' ? `Ошибка: ${error}` : 'Нет данных'}
                                </TableCell>
                            </TableRow>
                        )}
                    </tbody>
                </Table>
            </TableContainer>

            <CategoryEditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                category={editingCategory}
            />
        </Container>
    );
};

export default CategoriesManagement;

const IconPreview = styled.img`
    width: 24px;
    height: 24px;
    object-fit: contain;
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

// Общие стили (аналогичны предыдущим компонентам)
const Container = styled.div`
    padding: 2rem;
    background-color: #f8fafc;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;

const AddButton = styled.button`
    background-color: #4f46e5;
    color: white;
    border: none;
    padding: 0.625rem 1.25rem;
    border-radius: 0.375rem;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: background-color 0.2s;
    
    &:hover {
        background-color: #4338ca;
    }
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

const Actions = styled.div`
    display: flex;
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