import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, Button, ButtonToolbar, } from 'react-bootstrap';

class TagPicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.selected,
    };

    this.handleChange = this.handleChange.bind(this);
    this.getSubmitState = this.getSubmitState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.selected || nextProps.tags.map(tag => tag.id).find(() => true),});
  }

  handleChange(e) {
    this.setState({ value: e.target.value, });
  }

  getSubmitState() {
    if (!this.state.value) return false;
    if (this.props.loading) return false;
    return true;
  }

  render() {
    return (
      <div>
        <h2>Select Tag</h2>
        <div className='well'>
          <form>
            <FormGroup controlId='tagPicker'>
              <ControlLabel>Tags</ControlLabel>
              <FormControl componentClass="select" value={this.state.value} onChange={this.handleChange}>
                {
                  this.props.tags.map(tag => {
                    return <option key={tag.id} value={tag.id}>{tag.id}</option>;
                  })
                }
              </FormControl>
            </FormGroup>
            <ButtonToolbar>
              <Button className='btn btn-primary' disabled={!this.getSubmitState()} onClick={() => this.props.selectContent(this.state.value)} >Apply</Button>
              <Button className='btn btn-primary' disabled={!this.getSubmitState()} onClick={() => this.props.previewContent(this.state.value)}>Preview</Button>
            </ButtonToolbar>
          </form>
        </div>
      </div>
    );
  }
}

TagPicker.propTypes = {
  tags: PropTypes.array,
  selected: PropTypes.string,
};

export default TagPicker;
