import React, { Component } from 'react';
import styled from 'styled-components';
import { blue } from '@material-ui/core/colors';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Author from './author-item';

const grid = 8;

const Wrapper = styled.div`
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? blue[50] : blue[100]};
  display: flex;
  flex-direction: column;
  padding: ${grid}px;
  user-select: none;
  transition: background-color 0.1s ease;
  margin: ${grid}px 0;
`;

const DropZone = styled.div`
  display: flex;
  align-items: start;
  min-width: 600px;
  min-height: 60px;
`;

const ScrollContainer = styled.div`
  overflow: auto;
`;

const Container = styled.div`
  flex-grow: 1;
  display: inline-flex;
`;

export default class AuthorList extends Component {
  static defaultProps = {
    isCombineEnabled: false,
  };
  renderBoard = dropProvided => {
    const { quotes } = this.props;

    return (
      <Container>
        <DropZone ref={dropProvided.innerRef}>
          {quotes.map((quote, index) => (
            <Draggable key={quote.id} draggableId={quote.id} index={index}>
              {(
                dragProvided,
                dragSnapshot,
              ) => (
                <Author
                  author={quote.author}
                  provided={dragProvided}
                  snapshot={dragSnapshot}
                />
              )}
            </Draggable>
          ))}
          {dropProvided.placeholder}
        </DropZone>
      </Container>
    );
  };

  render() {
    const { listId, listType, internalScroll, isCombineEnabled } = this.props;

    return (
      <Droppable
        droppableId={listId}
        type={listType}
        direction="horizontal"
        isCombineEnabled={isCombineEnabled}
      >
        {(
          dropProvided,
          dropSnapshot,
        ) => (
          <Wrapper
            isDraggingOver={dropSnapshot.isDraggingOver}
            {...dropProvided.droppableProps}
          >
            {internalScroll ? (
              <ScrollContainer>
                {this.renderBoard(dropProvided)}
              </ScrollContainer>
            ) : (
              this.renderBoard(dropProvided)
            )}
          </Wrapper>
        )}
      </Droppable>
    );
  }
}
