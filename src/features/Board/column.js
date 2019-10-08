import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, TextField, Tooltip } from '@material-ui/core';
import { cyan, grey } from '@material-ui/core/colors';
import { Draggable } from 'react-beautiful-dnd';
import { CARD_WIDTH } from 'common/constants';
import List from './components/list';

const Container = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  width: ${CARD_WIDTH}px;
  border: 4px solid ${({ color }) => color};
  border-radius: 4px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 4px solid ${({ color }) => color};
  background-color: ${grey[200]};
`;

const Title = styled.h4`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 8px;
  font-weight: normal;
  font-size: 16px;  
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  position: relative;
`;

const StyledButton = styled(Button)`
  && {
    min-width: 30px;
    padding: 4px;
    font-weight: bold;
    font-size: 16px;
  }
`;

const Form = styled.div`
  padding: 10px;
`;

const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
`;

const StyledTextField = styled(TextField)`
  && {
    width: 100%;
  }
`;

export default class Column extends Component {
  state = {
    isCardFormOpen: false,
    cardText: '',
  };

  toggleCardCreation = () => {
    this.setState(prevState => ({
      isCardFormOpen: !prevState.isCardFormOpen,
      cardText: '',
    }));
  };

  onChange = e => {
    this.setState({
      cardText: e.target.value,
    });
  };

  createCard = () => {
    const { cardText } = this.state;
    const { listId, addCard } = this.props;
    addCard(listId, cardText);

    this.toggleCardCreation();
  };

  render() {
    const {
      hat,
      cards,
      index,
      isScrollable,
      isCombineEnabled,
      listId,
    } = this.props;
    const { isCardFormOpen, cardText } = this.state;

    return (
      <Draggable draggableId={hat.name} index={index}>
        {(provided, snapshot) => (
          <Container
            color={hat.color}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <Header color={hat.color} isDragging={snapshot.isDragging}>
              <Title
                isDragging={snapshot.isDragging}
                {...provided.dragHandleProps}
              >
                {hat.name}
                <Tooltip title="Create card">
                  <StyledButton
                    color="primary"
                    onClick={this.toggleCardCreation}
                  >
                    +
                  </StyledButton>
                </Tooltip>
              </Title>
            </Header>
            {isCardFormOpen && (
              <Form>
                <StyledTextField
                  multiline
                  label="Card text"
                  name="cardText"
                  value={cardText}
                  onChange={this.onChange}
                />
                <FormFooter>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={this.toggleCardCreation}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={this.createCard}
                  >
                    Send
                  </Button>
                </FormFooter>
              </Form>
            )}
            <List
              listId={listId}
              listType="QUOTE"
              style={{
                backgroundColor: snapshot.isDragging ? cyan[50] : null,
              }}
              hat={hat}
              cards={cards}
              internalScroll={isScrollable}
              isCombineEnabled={!!isCombineEnabled}
            />
          </Container>
        )}
      </Draggable>
    );
  }
}