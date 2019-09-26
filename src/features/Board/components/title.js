import styled from 'styled-components';

export default styled.h4`
  margin: 0;
  padding: 8px;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  position: relative;
  &:focus {
    outline: 2px solid #ccc;
    outline-offset: 2px;
  }
`;