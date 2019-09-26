import React, { Component } from 'react';
import styled from 'styled-components';
import { teal, blue, blueGrey } from '@material-ui/core/colors';

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
  border-color: ${({ isDragging }) => (isDragging ? teal[50] : '#fff')};
  border-style: solid;
  border-width: 15px;
  box-shadow: ${({ isDragging }) =>
    isDragging ? `2px 2px 1px ${blueGrey[500]}` : 'none'};

  &:focus {
    outline: none;
    border-color: ${({ isDragging }) =>
      isDragging ? teal[50] : blue[700]};
  }
`;

export default class AuthorItem extends Component {
  render() {
    const author = this.props.author;
    const provided = this.props.provided;
    const snapshot = this.props.snapshot;

    return (
      <Avatar
        ref={ref => provided.innerRef(ref)}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        src={author.avatarUrl}
        alt={author.name}
        isDragging={snapshot.isDragging}
      />
    );
  }
}