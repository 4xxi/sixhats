import React from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import { Button } from '@material-ui/core';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import uuid from 'uuid';
import { CARD_WIDTH, hats } from 'common/constants';
import Column from './column';
import reorder, { reorderQuoteMap } from './reorder';
import { authorQuoteMap } from './data';

const ParentContainer = styled.div`
  height: ${({ height }) => height};
  overflow-x: hidden;
  overflow-y: auto;
`;

const Container = styled.div`
  min-height: calc(100vh - 70px);
  min-width: 100vw;
  display: inline-flex;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
`;

const ProgramName = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const initial = authorQuoteMap;

class Board extends React.Component {
  state = {
    columns: initial,
    ordered: Object.keys(initial),
  };

  componentDidUpdate(prevProps) {
    if (this.props.rooms && prevProps.rooms) {
      const { boardId, rooms } = prevProps;
      const programId = this.getProgramId();
      const oldHats = rooms[boardId].hats[programId];
      const newHats = this.props.rooms[boardId].hats[programId];
      let updatedIndex = -1;
      let index = 0;

      for (let key in newHats) {
        if (this.isHatChanged(oldHats[key], newHats[key])) {
          updatedIndex = index;
          break;
        }
        index++;
      }

      if (updatedIndex > -1) {
        window.scrollTo(updatedIndex * CARD_WIDTH, 0);
      }
    }
  }

  isHatChanged = (oldHat, newHat) => {
    if (typeof oldHat !== typeof newHat) {
      return true;
    }

    if (Array.isArray(newHat)) {
      if (oldHat.length !== newHat.length) {
        return true;
      }

      if (this.getFullIdString(newHat) !== this.getFullIdString(oldHat)) {
        return true;
      }
    }

    return false;
  };

  getFullIdString = cards => cards.reduce((prev, current) => prev + current.id, '');

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

  logout = () => {
    Router.push('/');
  };

  render() {
    const { isCombineEnabled, withScrollableColumns, programs, rooms, t } = this.props;
    const { containerHeight } = 600;

    if (!rooms || !programs) {
      return null;
    }

    const program = programs[this.getProgramId()];
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
                t={t}
              />
            ))}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    );

    return (
      <>
        <Header>
          <ProgramName>{program.name}</ProgramName>
          <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={this.logout}
          >
            {t('logout')}
          </Button>
        </Header>

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
