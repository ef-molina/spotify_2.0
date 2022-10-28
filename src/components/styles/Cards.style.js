import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  padding: 0.8rem;
  gap: ${({ gap }) => gap || 'none'};
  background: rgba(79, 79, 79, 0.131);
  align-items: center;
  overflow: hidden;
  flex-direction: ${({ direction }) => direction};
  aspect-ratio: ${({ aspectRatio }) => aspectRatio};
  min-height: ${({ height }) => height || '100%'};
  min-width: ${({ width }) => width || '100%'};
  border-radius: 0.2rem;
  flex-shrink: 1;

  &:hover {
    background: rgba(255, 255, 255, 0.31);
    transition: all 300ms ease;
  }
`;

export const TitleText = styled.h4`
  text-overflow: ellipsis;
  overflow-wrap: hidden;
  width: fit-content;
  overflow-x: hidden;
`;

export const MutedText = styled.p`
  color: #dce1ebbe;
`;
