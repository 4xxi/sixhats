import React from 'react';
import styled from 'styled-components';
import {
  FormControl,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core';
import { hats } from 'common/constants';

const Form = styled.div``;
const StyledFormControl = styled(FormControl)``;

class ProgramForm extends React.Component {
  state = {
    title: '',
    hats: ['blue', 'green', 'white'],
  };

  onChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  onSubmit = () => {
    this.props.addProgram(this.state);
  };

  render() {
    const { title, hats } = this.state;

    return (
      <Form>
        <StyledFormControl>
          <TextField
            label="Program name"
            value={title}
            name="title"
            onChange={this.onChange}
          />
        </StyledFormControl>
        <Button onClick={this.onSubmit}>Add</Button>
      </Form>
    );
  }
}

export default ProgramForm;