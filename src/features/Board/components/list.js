import React from 'react';
import styled from 'styled-components';
import { grey } from '@material-ui/core/colors';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Card from './card';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  opacity: ${({ isDropDisabled }) => (isDropDisabled ? 0.5 : 'inherit')};
  padding: 8px;
  padding-bottom: 0;
  transition: background-color 0.2s ease, opacity 0.1s ease;
  user-select: none;
`;

const scrollContainerHeight = 250;

const DropZone = styled.div`
  min-height: ${scrollContainerHeight}px;
`;

const ScrollContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: ${scrollContainerHeight}px;
`;

const Container = styled.div``;

const Title = styled.h4`
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

const InnerQuoteList = React.memo(function InnerQuoteList(
  props,
) {
  return props.cards.map((card, index) => (
    <Draggable key={card.id} draggableId={card.id} index={index}>
      {(
        dragProvided,
        dragSnapshot,
      ) => (
        <Card
          key={card.id}
          quote={card}
          hat={props.hat}
          isDragging={dragSnapshot.isDragging}
          isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
          provided={dragProvided}
        />
      )}
    </Draggable>
  ));
});

function InnerList(props) {
  const { cards, dropProvided, hat } = props;
  const title = props.title ? <Title>{props.title}</Title> : null;

  return (
    <Container>
      {title}
      <DropZone ref={dropProvided.innerRef}>
        <InnerQuoteList cards={cards} hat={hat} />
        {dropProvided.placeholder}
      </DropZone>
    </Container>
  );
}

export default function List(props) {
  const {
    ignoreContainerClipping,
    internalScroll,
    scrollContainerStyle,
    isDropDisabled,
    isCombineEnabled,
    listId = 'LIST',
    listType,
    style,
    cards,
    title,
    hat,
  } = props;

  return (
    <Droppable
      droppableId={listId}
      type={listType}
      ignoreContainerClipping={ignoreContainerClipping}
      isDropDisabled={isDropDisabled}
      isCombineEnabled={isCombineEnabled}
    >
      {(
        dropProvided,
        dropSnapshot,
      ) => (
        <Wrapper
          style={style}
          color={hat.color}
          isDraggingOver={dropSnapshot.isDraggingOver}
          isDropDisabled={isDropDisabled}
          isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          {...dropProvided.droppableProps}
        >
          {internalScroll ? (
            <ScrollContainer style={scrollContainerStyle}>
              <InnerList
                hat={hat}
                cards={cards}
                title={title}
                dropProvided={dropProvided}
              />
            </ScrollContainer>
          ) : (
            <InnerList
              hat={hat}
              cards={cards}
              title={title}
              dropProvided={dropProvided}
            />
          )}
        </Wrapper>
      )}
    </Droppable>
  );
}