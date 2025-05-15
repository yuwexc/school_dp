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
    const [viewMode, setViewMode] = useState<'standard' | 'compact'>('standard');

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
                <Controls>
                    <ViewToggle>
                        <ToggleButton
                            active={viewMode === 'standard'}
                            onClick={() => setViewMode('standard')}
                        >
                            Стандартный
                        </ToggleButton>
                        <ToggleButton
                            active={viewMode === 'compact'}
                            onClick={() => setViewMode('compact')}
                        >
                            Компактный
                        </ToggleButton>
                    </ViewToggle>
                    <AddButton onClick={() => { setEditingCategory(null); setIsModalOpen(true); }}>
                        + Добавить категорию
                    </AddButton>
                </Controls>
            </Header>

            <TableContainer>
                {viewMode === 'standard' ? (
                    <StandardTable>
                        <TableHeader>
                            <tr>
                                <TableHeaderCell>ID</TableHeaderCell>
                                <TableHeaderCell>Название</TableHeaderCell>
                                <TableHeaderCell>Иконка</TableHeaderCell>
                                <TableHeaderCell>Действия</TableHeaderCell>
                            </tr>
                        </TableHeader>
                        <tbody>
                            {renderTableBody()}
                        </tbody>
                    </StandardTable>
                ) : (
                    <CompactGrid>
                        {renderCompactGrid()}
                    </CompactGrid>
                )}
            </TableContainer>

            <CategoryEditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                category={editingCategory}
            />
        </Container>
    );

    function renderTableBody() {
        if (status === 'loading') {
            return Array(skeletonRows).fill(0).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                    <TableCell><SkeletonBox width="50px" /></TableCell>
                    <TableCell><SkeletonBox /></TableCell>
                    <TableCell><SkeletonBox /></TableCell>
                    <TableCell>
                        <Actions>
                            <SkeletonIconButton />
                            <SkeletonIconButton />
                        </Actions>
                    </TableCell>
                </TableRow>
            ));
        } else if (categories && categories.length > 0) {
            return categories.map(category => (
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
            ));
        } else {
            return (
                <TableRow>
                    <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                        {status === 'failed' ? `Ошибка: ${error}` : 'Нет данных'}
                    </TableCell>
                </TableRow>
            );
        }
    }

    function renderCompactGrid() {
        if (status === 'loading') {
            return Array(Math.ceil(skeletonRows / 2)).fill(0).map((_, rowIndex) => (
                <CompactGridRow key={`skeleton-row-${rowIndex}`}>
                    {Array(2).fill(0).map((_, colIndex) => (
                        <CompactGridCell key={`skeleton-cell-${rowIndex}-${colIndex}`}>
                            <SkeletonBox width="30px" />
                            <CompactCellContent>
                                <SkeletonBox width="120px" />
                                <SkeletonBox width="80px" />
                            </CompactCellContent>
                            <SkeletonIconButton />
                        </CompactGridCell>
                    ))}
                </CompactGridRow>
            ));
        } else if (categories && categories.length > 0) {
            const rows = [];
            for (let i = 0; i < categories.length; i += 2) {
                const pair = categories.slice(i, i + 2);
                rows.push(
                    <CompactGridRow key={`row-${i}`}>
                        {pair.map(category => (
                            <CompactGridCell key={category.id_category}>
                                <span>#{category.id_category?.toString().padStart(3, '0')}</span>
                                <CompactCellContent>
                                    <strong>{category.category_name}</strong>
                                    {category.image && (
                                        <IconPreview src={category.image} alt={`Иконка ${category.image}`} />
                                    )}
                                </CompactCellContent>
                                <IconButton onClick={() => handleEdit(category)}>
                                    <EditIcon />
                                </IconButton>
                            </CompactGridCell>
                        ))}
                        {pair.length < 2 && <CompactGridCell style={{ visibility: 'hidden' }} />}
                    </CompactGridRow>
                );
            }
            return rows;
        } else {
            return (
                <EmptyMessage>
                    {status === 'failed' ? `Ошибка: ${error}` : 'Нет данных'}
                </EmptyMessage>
            );
        }
    }
};

export default CategoriesManagement;

const CompactGrid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem;
`;

const CompactGridRow = styled.div`
    display: flex;
    gap: 0.75rem;
`;

const CompactGridCell = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem;
    background-color: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    transition: all 0.2s;
    
    &:hover {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        background-color: #f8fafc;
    }
`;

const EmptyMessage = styled.div`
    text-align: center;
    padding: 2rem;
    color: #64748b;
`;


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

const Controls = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
`;

const ViewToggle = styled.div`
    display: flex;
    border-radius: 0.375rem;
    overflow: hidden;
    background-color: #e2e8f0;
`;

const ToggleButton = styled.button<{ active?: boolean }>`
    padding: 0.5rem 1rem;
    border: none;
    background-color: ${props => props.active ? '#4f46e5' : 'transparent'};
    color: ${props => props.active ? 'white' : '#334155'};
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s;
    
    &:hover {
        background-color: ${props => props.active ? '#4338ca' : '#cbd5e1'};
    }
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

const StandardTable = styled.table`
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

const CompactCellContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
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