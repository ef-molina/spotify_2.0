import styled from 'styled-components';

export const Button = styled.a`
  border-style: none;
  margin: 2rem;
  background-color: ${({ theme }) => theme.colors.accent};
  border-radius: 3rem;
  padding: 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  cursor: pointer;
  transition: 100ms linear;

  &:hover {
    opacity: 1;
  }

  &:active {
    transform: translateY(1.5px);
    transition: 100ms linear;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;
