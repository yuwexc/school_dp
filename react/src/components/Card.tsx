import styled from 'styled-components';

const CardContainer = styled.div<{ width?: string }>`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  width: ${props => props.width || '100%'};
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e293b;
`;

export const Card = ({ title, children, width }: { title: string; children: React.ReactNode; width?: string }) => {
  return (
    <CardContainer width={width}>
      <CardTitle>{title}</CardTitle>
      {children}
    </CardContainer>
  );
};