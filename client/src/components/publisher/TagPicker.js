import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, Button, ButtonToolbar, } from 'react-bootstrap';

const TagPicker = ({ current, tags, }) => {
  return (
    <div>
      <h2>Select Tag</h2>
        <div className='well'>
          <form>
            <FormGroup controlId='tagPicker'>
              <ControlLabel>Tags</ControlLabel>
              <FormControl componentClass="select">
                {
                  tags.map(tag => {
                    return <option key={tag.id} value={tag.id}>{tag.id}</option>;
                  })
                }
              </FormControl>
            </FormGroup>
            <ButtonToolbar>
              <Button className='btn btn-primary'>Apply</Button>
              <Button className='btn btn-primary'>Preview</Button>
            </ButtonToolbar>
          </form>
        </div>
    </div>
  );
};

TagPicker.propTypes = {
  tags: PropTypes.array,
};

export default TagPicker;
