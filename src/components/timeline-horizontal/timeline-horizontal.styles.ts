import styled from 'styled-components';

export const TimelineHorizontalWrapper = styled.ul<{
  flipLayout?: boolean;
  startEndPadding: number;
}>`
  display: flex;
  list-style: none;
  margin: 0;
  width: 100%;
  direction: ${(p) => (p.flipLayout ? 'rtl' : 'ltr')};

  &.vertical {
    flex-direction: column;
  }
  &.horizontal {
    flex-direction: row;
    padding: ${(p) => `0px ${p.startEndPadding}px`};
  }
`;

export const TimelineItemWrapper = styled.li<{ width: number }>`
  width: ${(p) => p.width}px;
  visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  flex-direction: column;

  &.vertical {
    margin-bottom: 2rem;
    width: 100%;
  }

  &.visible {
    visibility: visible;
  }
`;
