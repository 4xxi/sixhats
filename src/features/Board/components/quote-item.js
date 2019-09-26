import React from 'react';
import styled from 'styled-components';
import { grey, cyan, indigo } from '@material-ui/core/colors';

const grid = 8;

const getBackgroundColor = (
  isDragging,
  isGroupedOver,
  authorColors,
) => {
  if (isDragging) {
    return authorColors.soft;
  }

  if (isGroupedOver) {
    return cyan[50];
  }

  return '#fff';
};

const getBorderColor = (isDragging, authorColors) =>
  isDragging ? authorColors.hard : 'transparent';

const Container = styled.a`
  border-radius: 2px;
  border: 2px solid transparent;
  border-color: ${props => getBorderColor(props.isDragging, props.colors)};
  background-color: ${props =>
    getBackgroundColor(props.isDragging, props.isGroupedOver, props.colors)};
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
    border-color: ${props => props.colors.hard};
    box-shadow: none;
  }

  /* flexbox */
  display: flex;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: ${grid}px;
  flex-shrink: 0;
  flex-grow: 0;
`;

const Content = styled.div`
  flex-grow: 1;
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
`;

const BlockQuote = styled.div`
  &::before {
    content: open-quote;
  }
  &::after {
    content: close-quote;
  }
`;

const Footer = styled.div`
  display: flex;
  margin-top: ${grid}px;
  align-items: center;
`;

const Author = styled.small`
  flex-grow: 0;
  margin: 0;
  background-color: ${props => props.colors.soft};
  border-radius: 2px;
  font-weight: normal;
  padding: ${grid / 2}px;
`;

const QuoteId = styled.small`
  flex-grow: 1;
  flex-shrink: 1;
  margin: 0;
  font-weight: normal;
  text-overflow: ellipsis;
  text-align: right;
`;

function QuoteItem(props) {
  const { quote, isDragging, isGroupedOver, provided } = props;

  return (
    <Container
      href={quote.author.url}
      isDragging={isDragging}
      isGroupedOver={isGroupedOver}
      colors={quote.author.colors}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Avatar src={quote.author.avatarUrl} alt={quote.author.name} />
      <Content>
        <BlockQuote>{quote.content}</BlockQuote>
        <Footer>
          <Author colors={quote.author.colors}>{quote.author.name}</Author>
          <QuoteId>id:{quote.id}</QuoteId>
        </Footer>
      </Content>
    </Container>
  );
}

export default React.memo(QuoteItem);