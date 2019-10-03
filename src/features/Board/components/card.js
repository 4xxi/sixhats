import React from 'react';
import styled from 'styled-components';
import { grey, indigo } from '@material-ui/core/colors';

const grid = 8;

const Container = styled.span`
  display: flex;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: ${({ isDragging }) =>
    isDragging ? `2px 2px 1px ${grey[400]}` : 'none'};
  padding: ${grid}px;
  min-height: 40px;
  margin-bottom: ${grid}px;
  user-select: none;
  text-decoration: none;

  color: ${indigo[900]};

  &:hover,
  &:active {
    color: ${indigo[900]};
    text-decoration: none;
  }

  &:focus {
    outline: none;
    border-color: ${indigo[400]};
    box-shadow: none;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
`;

function Card(props) {
  const { quote, isDragging, isGroupedOver, provided, hat } = props;

  return (
    <Container
      isDragging={isDragging}
      isGroupedOver={isGroupedOver}
      color={hat.color}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Content>
        {quote.content}
      </Content>
    </Container>
  );
}

export default React.memo(Card);