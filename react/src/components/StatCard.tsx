import styled from 'styled-components';

const StatCardContainer = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const StatTitle = styled.span`
  color: #64748b;
  font-size: 0.875rem;
`;

const StatIcon = styled.span`
  font-size: 1.5rem;
`;

const StatValue = styled.div`
  font-size: 1.875rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.25rem;
`;

const StatTrend = styled.div<{ $positive: boolean }>`
  margin-top: 10px;
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: ${props => props.$positive ? '#10b981' : '#ef4444'};
`;

export const StatCard = ({ title, value, icon, trend }: { title: string; value: number; icon: string; trend: number }) => {
  const isPositive = trend >= 0;

  return (
    <StatCardContainer>
      <StatHeader>
        <StatTitle>{title}</StatTitle>
        <StatIcon>{icon}</StatIcon>
      </StatHeader>
      <StatValue>{value.toLocaleString()}</StatValue>
      <StatTrend $positive={isPositive}>
        {Math.abs(trend)}% {isPositive ? 'рост' : 'снижение'} за 7 дней
      </StatTrend>
    </StatCardContainer>
  );
};