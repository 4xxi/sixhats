import React from 'react';
import styled from 'styled-components';
import uuid from 'uuid';
import Router from 'next/router';
import { isLoaded } from 'react-redux-firebase';
import {
  FormControl,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core';

const Wrapper = styled.div`
  width: 300px;
`;

const Block = styled.div`
  margin-bottom: 30px;
`;

const BlockTitle = styled.div`
  padding-bottom: 5px;
  font-weight: bold;
  font-size: 16px;
`;

const StyledFormControl = styled(FormControl)`
  && {
    width: 300px;
  }
`;

class Entry extends React.Component {
  state = {
    code: '',
    program: '',
  };

  onChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  onCreate = () => {
    const { code, program } = this.state;
    const { programs } = this.props;

    if (code) {
      Router.push(`/board/${code}`);
    } else {
      const wasteHats = {};

      for(let i = 0; i < programs[program].hats.length; i++) {
        wasteHats[uuid()] = "";
      }

      this.props.createBoard({
        hats: {
          [program]: wasteHats,
        }
      });
    }
  };

  render() {
    const { code, program } = this.state;
    const { programs } = this.props;

    return (
      <Wrapper>
        <Block>
          <BlockTitle>Join room</BlockTitle>
          <StyledFormControl>
            <TextField
              label="Code"
              value={code}
              name="code"
              onChange={this.onChange}
            />
          </StyledFormControl>
        </Block>
        <Block>
          <BlockTitle>or create your own</BlockTitle>
          <StyledFormControl>
            <InputLabel htmlFor="choose-program">
              Choose a program
            </InputLabel>
            <Select
              value={program}
              onChange={this.onChange}
              inputProps={{
                name: 'program',
                id: 'choose-program'
              }}
            >
              {isLoaded(programs) && Object.keys(programs).map(item => (
                <MenuItem value={item} key={item}>
                  {programs[item].name}
                </MenuItem>
              ))}
            </Select>

          </StyledFormControl>
        </Block>
        <Button color="primary" variant="contained" onClick={this.onCreate}>
          Next
        </Button>
      </Wrapper>
    );
  }
}

export default Entry;