import styled from 'styled-components';
import { neutrals20, neutrals70 } from '@blotoutio/ui-kit/colors';
import { FieldWrapper } from '@blotoutio/ui-kit';

export const Wrapper = styled.div`
  min-height: calc(100vh - 192.77px);
  padding: 64px;
`;

export const StyledFieldWrapper = styled(FieldWrapper)`
  width: 100%;

  label {
    width: 100%;
  }
`;

export const Release = styled.span`
  color: green;
  font-weight: 800;
`;

export const AddHostel = styled.div`
  width: 155px;
  margin: 5px;
`;

export const TableIconsWrapper = styled.div`
  display: flex;
  align-content: center;

  & > *:not(:last-child) {
    margin-right: 18px;
  }
`;

export const TableIconWrapper = styled.div`
  display: flex;
  height: 24px;
  width: 24px;
  justify-content: center;
  border-radius: 3px;
  align-content: center;
  cursor: ${({ isDisabled }) => (isDisabled ? 'default' : 'pointer')};
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};

  a {
    color: ${neutrals70};
  }

  &:hover {
    background: ${neutrals20};
  }

  &.trash {
    color: #dc3545;
  }

  svg {
    height: auto;
  }
`;
