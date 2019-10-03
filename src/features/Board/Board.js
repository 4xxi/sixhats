import React from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import uuid from 'uuid';
import Column from './column';
import reorder, { reorderQuoteMap } from './reorder';
import { authorQuoteMap } from './data';
import { hats } from 'common/constants';

const ParentContainer = styled.div`
  height: ${({ height }) => height};
  overflow-x: hidden;
  overflow-y: auto;
`;

const Container = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: inline-flex;
`;

const ProgramName = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
`;

const initial = authorQuoteMap;

class Board extends React.Component {
  state = {
    columns: initial,
    ordered: Object.keys(initial),
  };

  extractColumns = () => {
    const { rooms } = this.props;
    const room = Object.values(rooms)[0];
    return Object.values(room.hats)[0];
  };

  onDragEnd = result => {
    if (result.combine) {
      if (result.type === 'COLUMN') {
        const shallow = [...this.state.ordered];
        shallow.splice(result.source.index, 1);
        this.setState({ ordered: shallow });
        return;
      }

      const column = this.state.columns[result.source.droppableId];
      const withQuoteRemoved = [...column];
      withQuoteRemoved.splice(result.source.index, 1);
      const columns = {
        ...this.state.columns,
        [result.source.droppableId]: withQuoteRemoved,
      };
      this.setState({ columns });
      return;
    }

    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (result.type === 'COLUMN') {
      const ordered = reorder(
        this.state.ordered,
        source.index,
        destination.index,
      );

      this.setState({
        ordered,
      });

      return;
    }

    const columns = this.extractColumns();

    const data = reorderQuoteMap({
      quoteMap: columns,
      source,
      destination,
    });

    this.updateData(data.quoteMap);
  };

  addCard = (hatId, content) => {
    const columns = this.extractColumns();

    if (!Array.isArray(columns[hatId])) {
      columns[hatId] = [];
    }

    columns[hatId].push({
      id: uuid(),
      content,
    });

    this.updateData(columns);
  };

  updateData = data => {
    const { boardId, updateData } = this.props;

    updateData({
      path: `/rooms/${boardId}/hats/${this.getProgramId()}`,
      data,
    });
  };

  getProgramId = () => {
    const { rooms } = this.props;
    const room = Object.values(rooms)[0];

    return Object.keys(room.hats)[0];
  };

  render() {
    const { isCombineEnabled, withScrollableColumns, programs, rooms } = this.props;
    const { containerHeight } = 600;

    if (!rooms || !programs) {
      return null;
    }

    const program = programs[this.getProgramId()];
console.log(hats[program.hats[0]]);
    const columns = this.extractColumns();
    const board = (
      <Droppable
        droppableId="board"
        type="COLUMN"
        direction="horizontal"
        ignoreContainerClipping={!!containerHeight}
        isCombineEnabled={isCombineEnabled}
      >
        {provided => (
          <Container ref={provided.innerRef} {...provided.droppableProps}>
            {Object.keys(columns).map((key, index) => (
              <Column
                key={key}
                index={index}
                hat={hats[program.hats[index]]}
                cards={columns[key] || []}
                listId={key}
                isScrollable={withScrollableColumns}
                isCombineEnabled={isCombineEnabled}
                addCard={this.addCard}
              />
            ))}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    );

    return (
      <>
        <ProgramName>{program.name}</ProgramName>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {containerHeight ? (
            <ParentContainer height={containerHeight}>{board}</ParentContainer>
          ) : (
            board
          )}
        </DragDropContext>
      </>
    );
  }
}

export default Board;
