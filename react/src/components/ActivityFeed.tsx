import styled from 'styled-components';
import { Activity } from '../interfaces/activity';

const ActivitiesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActivityItem = styled.div`
  display: flex;
  gap: 0.75rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div<{ type: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props =>
        props.type === 'login' ? '#dbeafe' :
            props.type === 'create' ? '#dcfce7' :
                props.type === 'delete' ? '#fee2e2' : '#f1f5f9'};
  color: ${props =>
        props.type === 'login' ? '#2563eb' :
            props.type === 'create' ? '#16a34a' :
                props.type === 'delete' ? '#dc2626' : '#64748b'};
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  flex-grow: 1;
`;

const ActivityText = styled.div`
  font-size: 0.875rem;
  color: #1e293b;
`;

const ActivityMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 0.25rem;
`;

const ActivityUser = styled.span`
  font-weight: 500;
`;

interface ActivityFeedProps {
    activities: Activity[];
}

export const ActivityFeed = ({ activities }: ActivityFeedProps) => {
    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'login': return '🔑';
            case 'create': return '➕';
            case 'update': return '✏️';
            case 'delete': return '🗑️';
            default: return 'ℹ️';
        }
    };

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            const now = new Date();
            const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

            if (diffInSeconds < 60) return 'только что';
            if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} минут назад`;
            if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} часов назад`;

            return `${Math.floor(diffInSeconds / 86400)} дней назад`;
        } catch {
            return new Date(dateString).toLocaleString();
        }
    };

    return (
        <ActivitiesList>
            {activities.length > 0 ? (
                activities.slice(0, 5).map(activity => (
                    <ActivityItem key={activity.id}>
                        <ActivityIcon type={activity.type}>
                            {getActivityIcon(activity.type)}
                        </ActivityIcon>
                        <ActivityContent>
                            <ActivityText>
                                <ActivityUser>{activity.user_name}</ActivityUser> {activity.description}
                            </ActivityText>
                            <ActivityMeta>
                                <span>
                                    {formatDate(activity.created_at)}
                                </span>
                                <span>{activity.entity_type}: {activity.entity_id}</span>
                            </ActivityMeta>
                        </ActivityContent>
                    </ActivityItem>
                ))
            ) : (
                <div style={{ color: '#64748b', textAlign: 'center', padding: '1rem' }}>
                    Нет последних действий
                </div>
            )}
        </ActivitiesList>
    );
};