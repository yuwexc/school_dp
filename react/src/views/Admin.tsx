import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import UsersManagement from './UsersManagement';
import CategoriesManagement from './CategoriesManagement';
import { fetchAdminStats } from '../features/adminSlice';
import { logoutUser } from '../features/userSlice';
import { StatCard } from '../components/StatCard';
import { Card } from '../components/Card';
import { User } from '../interfaces/user';
import { RecentUsers } from '../components/RecentUsers';
import { ActivityFeed } from '../components/ActivityFeed';
import { Stats } from '../interfaces/stats';

const AdminDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector<RootState, User>((state) => state.user.user);
  const stats = useSelector<RootState, Stats | null>((state) => state.admin.stats);

  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    dispatch(fetchAdminStats());
  }, [dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  if (!user) return null;

  return (
    <DashboardContainer>
      <Sidebar>
        <ProfileCard>
          <svg style={{ marginRight: '10px' }} xmlns="http://www.w3.org/2000/svg" version="1.0" width="48" height="48" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#fff" stroke="none"><path d="M2340 4984 c-19 -2 -82 -11 -140 -20 -973 -145 -1771 -876 -2003 -1835 -52 -211 -62 -307 -62 -569 0 -312 24 -473 111 -742 241 -747 825 -1330 1572 -1572 273 -88 430 -111 752 -110 229 1 270 3 400 27 516 93 975 335 1330 703 362 374 579 811 667 1339 25 156 25 554 0 710 -93 559 -336 1025 -733 1404 -294 280 -642 478 -1029 585 -218 60 -350 78 -605 81 -124 2 -241 1 -260 -1z m431 -355 c710 -72 1340 -512 1655 -1154 379 -775 247 -1684 -338 -2324 -27 -29 -50 -52 -52 -50 -1 2 -20 33 -41 69 -175 295 -464 497 -792 555 -125 21 -1157 22 -1280 1 -334 -59 -623 -261 -798 -556 -21 -36 -40 -67 -41 -69 -2 -2 -25 21 -52 50 -453 496 -641 1161 -511 1816 207 1046 1188 1771 2250 1662z"></path><path d="M2380 3946 c-178 -38 -333 -121 -468 -250 -187 -180 -282 -401 -283 -658 0 -133 11 -204 46 -308 102 -301 344 -525 652 -607 141 -37 326 -37 467 0 318 85 555 312 662 637 26 80 28 96 29 260 0 153 -3 185 -23 253 -94 327 -345 574 -672 662 -87 23 -321 29 -410 11z"></path></g></svg>
          <ProfileInfo>
            <Name>{user.first_name} {user.last_name}</Name>
            <Role>Администратор</Role>
          </ProfileInfo>
        </ProfileCard>

        <Nav>
          <NavItem
            $active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
          >
            <i className="icon-dashboard" /> Дашборд
          </NavItem>
          <NavItem
            $active={activeTab === 'users'}
            onClick={() => setActiveTab('users')}
          >
            <i className="icon-users" /> Пользователи
          </NavItem>
          <NavItem
            $active={activeTab === 'categories'}
            onClick={() => setActiveTab('categories')}
          >
            <i className="icon-categories" /> Категории
          </NavItem>
        </Nav>

        <LogoutButton onClick={handleLogout}>
          <i className="icon-logout" /> Выйти
        </LogoutButton>
      </Sidebar>

      <MainContent>
        {activeTab === 'dashboard' && (
          <>
            <Header>
              <h1>Панель управления</h1>
            </Header>

            <StatsGrid>
              <StatCard
                title="Пользователи"
                value={stats?.users_count || 0}
                icon="👥"
                trend={stats?.users_trend || 0}
              />
              <StatCard
                title="Преподаватели"
                value={stats?.teachers_count || 0}
                icon="👨‍🏫"
                trend={stats?.teachers_trend || 0}
              />
              <StatCard
                title="Категории"
                value={stats?.categories_count || 0}
                icon="📚"
                trend={stats?.categories_trend || 0}
              />
              <StatCard
                title="Активность"
                value={stats?.activity_count || 0}
                icon="🔔"
                trend={stats?.activity_trend || 0}
              />
            </StatsGrid>

            <ContentGrid>
              <Card title="Последняя активность" width="60%">
                <ActivityFeed activities={stats?.recent_activities || []} />
              </Card>
              <Card title="Новые пользователи" width="40%">
                <RecentUsers users={stats?.recent_users || []} />
              </Card>
            </ContentGrid>
          </>
        )}

        {activeTab === 'users' && (
          <UsersManagement />
        )}

        {activeTab === 'categories' && (
          <CategoriesManagement />
        )}

      </MainContent>
    </DashboardContainer>
  );
};

export default AdminDashboard;

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
`;

const Sidebar = styled.div`
  width: 280px;
  background-color: #1e293b;
  color: white;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`;

const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #334155;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const Role = styled.span`
  font-size: 0.875rem;
  color: #94a3b8;
`;

const Nav = styled.nav`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NavItem = styled.div<{ $active: boolean }>`
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: ${props => props.$active ? '#334155' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#cbd5e1'};
  transition: all 0.2s;

  &:hover {
    background-color: #334155;
    color: white;
  }

  i {
    font-size: 1.25rem;
  }
`;

const LogoutButton = styled.button`
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: transparent;
  color: #cbd5e1;
  border: none;
  margin-top: auto;
  transition: all 0.2s;

  &:hover {
    background-color: #334155;
    color: white;
  }

  i {
    font-size: 1.25rem;
  }
`;

const MainContent = styled.div`
  flex-grow: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContentGrid = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;