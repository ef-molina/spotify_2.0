import styled from 'styled-components';

export const AppContainer = styled.div`
  /* border: 1px solid blue; */
  display: grid;
  grid-template-rows: 1fr 10fr 1fr;
  gap: 0.5rem;
  max-height: 100vh;
  height: 100vh;
  /* overflow: hidden; */
`;

export const Flex = styled.div`
  display: flex;
  background: ${({ bg }) => bg};
  border: ${({ border }) => border};
  flex-direction: ${({ direction }) => direction};
  height: ${({ height }) => height || '100%'};
  width: ${({ width }) => width || '100%'};
  gap: ${({ gap }) => gap || 'none'};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  flex-direction: ${({ direction }) => direction || 'row'};
  overflow-y: ${({ overflowY }) => overflowY};
  overflow-x: ${({ oX }) => oX};
  padding: ${({ padding }) => padding};
  contain: content;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  /* grid-auto-rows: minmax(22%, 32%); */
  grid-auto-flow: row;
  gap: 1rem;

  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
