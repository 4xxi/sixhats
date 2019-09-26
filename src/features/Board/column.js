import React, { Component } from 'react';
import styled from 'styled-components';
import { grey, cyan } from '@material-ui/core/colors';
import { Draggable } from 'react-beautiful-dnd';
import QuoteList from './components/quote-list';
import Title from './components/title';

const Container = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: ${({ isDragging }) =>
    isDragging ? cyan[50] : grey[300]};
  transition: background-color 0.2s ease;
  &:hover {
    background-color: ${cyan[50]};
  }
`;

export default class Column extends Component {
  render() {
    const { title, quotes, index } = this.props;

    return (
      <Draggable draggableId={title} index={index}>
        {(provided, snapshot) => (
          <Container ref={provided.innerRef} {...provided.draggableProps}>
            <Header isDragging={snapshot.isDragging}>
              <Title
                isDragging={snapshot.isDragging}
                {...provided.dragHandleProps}
              >
                {title}
              </Title>
            </Header>
            <QuoteList
              listId={title}
              listType="QUOTE"
              style={{
                backgroundColor: snapshot.isDragging ? cyan[50] : null,
              }}
              quotes={quotes}
              internalScroll={this.props.isScrollable}
              isCombineEnabled={Boolean(this.props.isCombineEnabled)}
            />
          </Container>
        )}
      </Draggable>
    );
  }
}