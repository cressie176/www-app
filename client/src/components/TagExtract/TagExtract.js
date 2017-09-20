import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, Button, ButtonToolbar, } from 'react-bootstrap';

class TagExtract extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this.getValidationState = this.getValidationState.bind(this);
    this.getSubmitState = this.getSubmitState.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getValidationState() {
    if (this.state.value === '') return null;
    if (/^\w+$/.test(this.state.value)) return 'success';
    return 'error';
  }

  getSubmitState() {
    if (!/^\w+$/.test(this.state.value)) return false;
    if (this.props.loading) return false;
    return true;
  }

  handleChange(e) {
    this.setState({ value: e.target.value, });
  }

  render() {
    return (
      <div>
        <h2>Extract Content</h2>
          <div className='well'>
            <form>
              <FormGroup
                controlId='extractContent'
                validationState={this.getValidationState()}
              >
                <ControlLabel>Tag</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="Enter the tag to use when extracting content, e.g. 102"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <ButtonToolbar>
                <Button className='btn btn-primary' disabled={!this.getSubmitState()} onClick={(e) => { this.props.extractContent(this.state.value); }}>Apply</Button>
              </ButtonToolbar>
            </form>
          </div>
      </div>
    );
  }
}

TagExtract.propTypes = {
  loading: PropTypes.bool,
};

export default TagExtract;
